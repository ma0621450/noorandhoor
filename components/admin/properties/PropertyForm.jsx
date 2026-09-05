"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Trash2 } from "lucide-react";
import PageHeader from "@/components/admin/ui/PageHeader";
import AdminButton from "@/components/admin/ui/AdminButton";
import GalleryUploader from "@/components/admin/ui/GalleryUploader";
import ListEditor from "@/components/admin/ui/ListEditor";
import AdminSplash from "@/components/admin/ui/AdminSplash";
import EmptyState from "@/components/admin/ui/EmptyState";
import {
  CheckboxField,
  SelectField,
  TextArea,
  TextField,
} from "@/components/admin/ui/Fields";
import VisibilityPanel from "@/components/admin/ui/VisibilityPanel";
import { useToast } from "@/components/admin/providers/ToastProvider";
import useAdminProperties from "@/hooks/useAdminProperties";
import {
  DEFAULT_PROPERTY_AGENT,
  DEFAULT_PROPERTY_DOCUMENTS,
  DEFAULT_PROPERTY_FEATURES,
  PROPERTY_LOCATIONS,
  PROPERTY_LOCATION_OTHER,
  PROPERTY_MARKET_OPTIONS,
  PROPERTY_STATUSES,
  defaultPropertyType,
  normalizePropertyType,
  propertyTypesForMarket,
} from "@/lib/admin/constants";
import { slugify } from "@/lib/admin/utils";

function locationChoiceFromValue(location) {
  if (!location) return "";
  if (PROPERTY_LOCATIONS.includes(location)) return location;
  return PROPERTY_LOCATION_OTHER;
}

const EMPTY_FORM = {
  title: "",
  slug: "",
  location: "",
  market: "buy",
  type: defaultPropertyType("buy"),
  price: "",
  bedrooms: "",
  bathrooms: "",
  area: "",
  parking: "",
  view: "",
  listedAt: new Date().toISOString().slice(0, 10),
  status: "available",
  featured: false,
  images: [],
  aboutText: "",
  descriptionItems: [""],
  features: [""],
  documents: DEFAULT_PROPERTY_DOCUMENTS.map((doc) => ({ ...doc })),
  mapLat: "",
  mapLng: "",
  mapLabel: "",
  agentName: DEFAULT_PROPERTY_AGENT.name,
  agentPhone: DEFAULT_PROPERTY_AGENT.phone,
};

function toForm(property) {
  const images =
    property.images?.length
      ? property.images
      : property.image
        ? [property.image]
        : [];
  const aboutText = Array.isArray(property.about) && property.about.length
    ? property.about.join("\n\n")
    : property.description || "";

  return {
    title: property.title,
    slug: property.slug,
    location: property.location,
    market: property.market,
    type: normalizePropertyType(property.market, property.type),
    price: String(property.price ?? ""),
    bedrooms: String(property.bedrooms ?? ""),
    bathrooms: String(property.bathrooms ?? ""),
    area: String(property.area ?? ""),
    parking: String(property.parking ?? ""),
    view: property.view || "",
    listedAt: property.listedAt || new Date().toISOString().slice(0, 10),
    status: property.status,
    featured: Boolean(property.featured),
    images,
    aboutText,
    descriptionItems: property.descriptionItems?.length
      ? property.descriptionItems
      : [""],
    features: property.features?.length ? property.features : [""],
    documents: property.documents?.length
      ? property.documents.map((doc) => ({ ...doc }))
      : DEFAULT_PROPERTY_DOCUMENTS.map((doc) => ({ ...doc })),
    mapLat: String(property.mapLat ?? ""),
    mapLng: String(property.mapLng ?? ""),
    mapLabel: property.mapLabel || "",
    agentName: property.agentName || DEFAULT_PROPERTY_AGENT.name,
    agentPhone: property.agentPhone || DEFAULT_PROPERTY_AGENT.phone,
  };
}

export default function PropertyForm({ propertyId }) {
  const { properties, isReady, createProperty, updateProperty } =
    useAdminProperties();
  const router = useRouter();

  if (!isReady) return <AdminSplash label="Loading editor" />;

  if (!propertyId) {
    return (
      <PropertyEditor
        title="Add property"
        eyebrow="Create"
        submitLabel="Save property"
        onSave={createProperty}
      />
    );
  }

  const property = properties.find((item) => item.id === String(propertyId));
  if (!property) {
    return (
      <EmptyState
        title="Property not found"
        description="This listing is no longer in Supabase."
        actionLabel="Back to properties"
        onAction={() => router.push("/admin/properties")}
      />
    );
  }

  return (
    <PropertyEditor
      key={property.id}
      title="Edit property"
      eyebrow="Edit"
      submitLabel="Save changes"
      initialProperty={property}
      onSave={(payload) => updateProperty(property.id, payload)}
    />
  );
}

function PropertyEditor({
  title,
  eyebrow,
  submitLabel,
  initialProperty,
  onSave,
}) {
  const router = useRouter();
  const { showToast } = useToast();
  const [form, setForm] = useState(() =>
    initialProperty ? toForm(initialProperty) : EMPTY_FORM,
  );
  const [errors, setErrors] = useState({});
  const [slugLocked, setSlugLocked] = useState(Boolean(initialProperty));
  const [isSaving, setIsSaving] = useState(false);
  const [locationChoice, setLocationChoice] = useState(() =>
    locationChoiceFromValue(
      initialProperty ? initialProperty.location : EMPTY_FORM.location,
    ),
  );

  const setField = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const onLocationChoiceChange = (value) => {
    setLocationChoice(value);
    setErrors((current) => ({ ...current, location: undefined }));
    if (value === PROPERTY_LOCATION_OTHER) {
      setForm((current) => ({
        ...current,
        location: PROPERTY_LOCATIONS.includes(current.location)
          ? ""
          : current.location,
      }));
      return;
    }
    setField("location", value);
  };

  const onMarketChange = (value) => {
    setForm((current) => ({
      ...current,
      market: value,
      type: normalizePropertyType(value, current.type),
    }));
    setErrors((current) => ({
      ...current,
      market: undefined,
      type: undefined,
    }));
  };

  const onTitleChange = (value) => {
    setForm((current) => ({
      ...current,
      title: value,
      slug: slugLocked ? current.slug : slugify(value),
    }));
    setErrors((current) => ({ ...current, title: undefined }));
  };

  const addFeature = (feature) => {
    setForm((current) => {
      const existing = current.features.map((item) => item.trim()).filter(Boolean);
      if (existing.includes(feature)) return current;
      const next = current.features.some((item) => !item.trim())
        ? current.features.map((item) => (item.trim() ? item : feature))
        : [...current.features, feature];
      return { ...current, features: next };
    });
  };

  const validation = useMemo(() => {
    const next = {};
    if (!form.title.trim()) next.title = "Title is required.";
    if (!form.slug.trim()) next.slug = "Slug is required.";
    if (!form.location.trim()) next.location = "Location is required.";
    if (!form.market) next.market = "Market is required.";
    if (!form.type) next.type = "Type is required.";
    if (form.price === "" || Number(form.price) < 0) {
      next.price = "Enter a valid price.";
    }
    return next;
  }, [form]);

  const typeOptions = propertyTypesForMarket(form.market);

  const onSubmit = async (event) => {
    event.preventDefault();
    if (Object.keys(validation).length) {
      setErrors(validation);
      showToast("Please complete the required fields.", "error");
      return;
    }

    setIsSaving(true);
    try {
      await onSave({
        ...form,
        about: form.aboutText,
        descriptionItems: form.descriptionItems.filter((item) => item.trim()),
        features: form.features.filter((item) => item.trim()),
        documents: form.documents.filter((doc) => doc.name.trim()),
      });
      showToast(initialProperty ? "Property updated." : "Property added.");
      router.push("/admin/properties");
    } catch (error) {
      showToast(
        error?.message || "Could not save this property. Please try again.",
        "error",
      );
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <PageHeader
        eyebrow={eyebrow}
        title={title}
        description="Every field on the public property page can be set here — gallery, specs, about copy, features, documents, map, and agent."
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="space-y-5">
          <section className="space-y-5 rounded-2xl border border-white/8 bg-[#161616] p-5 sm:p-6">
            <h2 className="text-sm font-semibold text-white">Listing details</h2>
            <TextField
              id="property-title"
              label="Title"
              value={form.title}
              onChange={(event) => onTitleChange(event.target.value)}
              error={errors.title}
              placeholder="Marina Gate Residence"
            />
            <TextField
              id="property-slug"
              label="Slug"
              value={form.slug}
              onChange={(event) => {
                setSlugLocked(true);
                setField("slug", slugify(event.target.value));
              }}
              error={errors.slug}
              hint="Used in the public URL"
              tooltip="Auto-fills from the title. Change only if you need a custom URL."
            />
            <SelectField
              id="property-location"
              label="Location"
              value={locationChoice}
              onChange={(event) => onLocationChoiceChange(event.target.value)}
              error={
                locationChoice === PROPERTY_LOCATION_OTHER
                  ? undefined
                  : errors.location
              }
              placeholder="Select location"
              tooltip="Choose a listed area, or Other to type a custom location."
              options={[
                ...PROPERTY_LOCATIONS.map((item) => ({
                  value: item,
                  label: item,
                })),
                { value: PROPERTY_LOCATION_OTHER, label: "Other" },
              ]}
            />
            {locationChoice === PROPERTY_LOCATION_OTHER ? (
              <TextField
                id="property-location-other"
                label="Custom location"
                value={form.location}
                onChange={(event) => setField("location", event.target.value)}
                error={errors.location}
                placeholder="Enter location"
              />
            ) : null}
            <div className="grid gap-4 sm:grid-cols-2">
              <SelectField
                id="property-market"
                label="Market"
                value={form.market}
                onChange={(event) => onMarketChange(event.target.value)}
                error={errors.market}
                placeholder="Select market"
                tooltip="Matches the Buy, Rent, Sell, and Off Plan sections of the website."
                options={PROPERTY_MARKET_OPTIONS}
              />
              <SelectField
                id="property-type"
                label="Type"
                value={form.type}
                onChange={(event) => setField("type", event.target.value)}
                error={errors.type}
                placeholder="Select type"
                tooltip="Sub-page under the selected market. This controls where the listing appears."
                options={typeOptions}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <TextField
                id="property-price"
                label="Price (AED)"
                type="number"
                min="0"
                value={form.price}
                onChange={(event) => setField("price", event.target.value)}
                error={errors.price}
              />
              <TextField
                id="property-bedrooms"
                label="Bedrooms"
                type="number"
                min="0"
                value={form.bedrooms}
                onChange={(event) => setField("bedrooms", event.target.value)}
              />
              <TextField
                id="property-bathrooms"
                label="Bathrooms"
                type="number"
                min="0"
                value={form.bathrooms}
                onChange={(event) => setField("bathrooms", event.target.value)}
              />
              <TextField
                id="property-area"
                label="Area (sq ft)"
                type="number"
                min="0"
                value={form.area}
                onChange={(event) => setField("area", event.target.value)}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField
                id="property-parking"
                label="Parking spaces"
                type="number"
                min="0"
                value={form.parking}
                onChange={(event) => setField("parking", event.target.value)}
                hint="Shown as a tag on the detail page"
              />
              <TextField
                id="property-view"
                label="View"
                value={form.view}
                onChange={(event) => setField("view", event.target.value)}
                placeholder="Burj Khalifa"
                hint="Optional tag, e.g. sea view or skyline"
              />
            </div>
          </section>

          <section className="space-y-5 rounded-2xl border border-white/8 bg-[#161616] p-5 sm:p-6">
            <GalleryUploader
              value={form.images}
              onChange={(images) => setField("images", images)}
              error={errors.images}
            />
          </section>

          <section className="space-y-5 rounded-2xl border border-white/8 bg-[#161616] p-5 sm:p-6">
            <h2 className="text-sm font-semibold text-white">About this property</h2>
            <TextArea
              id="property-about"
              label="About paragraphs"
              rows={8}
              value={form.aboutText}
              onChange={(event) => setField("aboutText", event.target.value)}
              hint="Separate paragraphs with a blank line. This is the About section on the detail page."
              placeholder="Welcome to this stunning residence..."
            />
            <ListEditor
              label="Property description bullets"
              hint="Used on rent, sell, and off-plan detail pages."
              items={form.descriptionItems}
              onChange={(descriptionItems) => setField("descriptionItems", descriptionItems)}
              addLabel="Add bullet"
              placeholder="Type: Luxury Apartment"
            />
          </section>

          <section className="space-y-4 rounded-2xl border border-white/8 bg-[#161616] p-5 sm:p-6">
            <ListEditor
              label="Features"
              hint="Amenities shown in the Features grid on the detail page."
              items={form.features}
              onChange={(features) => setField("features", features)}
              addLabel="Add feature"
              placeholder="Swimming Pool"
            />
            <div className="flex flex-wrap gap-2">
              {DEFAULT_PROPERTY_FEATURES.map((feature) => (
                <button
                  key={feature}
                  type="button"
                  onClick={() => addFeature(feature)}
                  className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/70 transition hover:border-[#ba8a44] hover:text-[#eec876]"
                >
                  {feature}
                </button>
              ))}
            </div>
          </section>

          <section className="space-y-4 rounded-2xl border border-white/8 bg-[#161616] p-5 sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-medium uppercase tracking-[1.4px] text-white/60">
                  Property documents
                </p>
                <p className="mt-1 text-xs text-white/40">
                  Shown on buy detail pages. Mark each file as available or not.
                </p>
              </div>
              <AdminButton
                size="sm"
                variant="secondary"
                onClick={() =>
                  setField("documents", [
                    ...form.documents,
                    { name: "", available: false },
                  ])
                }
              >
                <Plus className="h-3.5 w-3.5" />
                Add document
              </AdminButton>
            </div>
            {form.documents.map((doc, index) => (
              <div
                key={`doc-${index}`}
                className="flex flex-col gap-3 rounded-xl border border-white/8 p-3 sm:flex-row sm:items-center"
              >
                <input
                  value={doc.name}
                  onChange={(event) => {
                    const next = [...form.documents];
                    next[index] = { ...next[index], name: event.target.value };
                    setField("documents", next);
                  }}
                  placeholder="Purchase-Agreement"
                  className="h-11 w-full rounded-xl border border-white/10 bg-[#171717] px-3 text-sm text-white outline-none transition placeholder:text-white/35 focus:border-[#ba8a44] focus:ring-1 focus:ring-[#ba8a44]/40"
                />
                <div className="flex items-center justify-between gap-3 sm:justify-end">
                  <CheckboxField
                    id={`doc-available-${index}`}
                    label="Available"
                    checked={Boolean(doc.available)}
                    onChange={(checked) => {
                      const next = [...form.documents];
                      next[index] = { ...next[index], available: checked };
                      setField("documents", next);
                    }}
                  />
                  <AdminButton
                    size="icon"
                    variant="ghost"
                    aria-label="Remove document"
                    onClick={() =>
                      setField(
                        "documents",
                        form.documents.filter((_, docIndex) => docIndex !== index),
                      )
                    }
                  >
                    <Trash2 className="h-4 w-4" />
                  </AdminButton>
                </div>
              </div>
            ))}
          </section>

          <section className="space-y-5 rounded-2xl border border-white/8 bg-[#161616] p-5 sm:p-6">
            <h2 className="text-sm font-semibold text-white">Map location</h2>
            <TextField
              id="property-map-label"
              label="Map label"
              value={form.mapLabel}
              onChange={(event) => setField("mapLabel", event.target.value)}
              placeholder="Dubai Marina, UAE"
            />
            <div className="grid gap-4 sm:grid-cols-2">
              <TextField
                id="property-map-lat"
                label="Latitude"
                type="number"
                step="any"
                value={form.mapLat}
                onChange={(event) => setField("mapLat", event.target.value)}
                placeholder="25.0805"
              />
              <TextField
                id="property-map-lng"
                label="Longitude"
                type="number"
                step="any"
                value={form.mapLng}
                onChange={(event) => setField("mapLng", event.target.value)}
                placeholder="55.1390"
              />
            </div>
          </section>
        </div>

        <aside className="space-y-5">
          <div className="space-y-5 rounded-2xl border border-white/8 bg-[#161616] p-5 sm:p-6">
            <SelectField
              id="property-status"
              label="Status"
              value={form.status}
              onChange={(event) => setField("status", event.target.value)}
              options={PROPERTY_STATUSES}
              tooltip="Available listings are public. Reserved stays visible. Sold is hidden from public pages."
            />
            <TextField
              id="property-listed-at"
              label="Listed date"
              type="date"
              value={form.listedAt}
              onChange={(event) => setField("listedAt", event.target.value)}
              hint="Drives the “listed ago” tag and off-plan listed date."
              tooltip="Used for sorting recent listings and the listed-ago label on the detail page."
            />
          </div>

          <VisibilityPanel
            title="Featured property"
            description="Featured properties appear in the Featured Properties section on the home page and on market pages."
            items={[
              {
                id: "property-featured",
                label: "Feature this property",
                description:
                  "Show this listing in Featured Properties on the home page and in market featured sections.",
                tooltip: "Also displays a Featured badge on property cards.",
                checked: form.featured,
                onChange: (checked) => setField("featured", checked),
              },
            ]}
          />

          <div className="space-y-5 rounded-2xl border border-white/8 bg-[#161616] p-5 sm:p-6">
            <h2 className="text-sm font-semibold text-white">Contact agent</h2>
            <TextField
              id="property-agent-name"
              label="Agent name"
              value={form.agentName}
              onChange={(event) => setField("agentName", event.target.value)}
              placeholder="Shakeeb Ahmad Khan"
            />
            <TextField
              id="property-agent-phone"
              label="Agent phone"
              value={form.agentPhone}
              onChange={(event) => setField("agentPhone", event.target.value)}
              placeholder="+971526938886"
            />
          </div>
        </aside>
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <AdminButton
          variant="secondary"
          disabled={isSaving}
          onClick={() => router.push("/admin/properties")}
        >
          Cancel
        </AdminButton>
        <AdminButton type="submit" disabled={isSaving}>
          {isSaving ? "Saving..." : submitLabel}
        </AdminButton>
      </div>
    </form>
  );
}
