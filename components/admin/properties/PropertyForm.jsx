"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import PageHeader from "@/components/admin/ui/PageHeader";
import AdminButton from "@/components/admin/ui/AdminButton";
import ImageUploader from "@/components/admin/ui/ImageUploader";
import AdminSplash from "@/components/admin/ui/AdminSplash";
import EmptyState from "@/components/admin/ui/EmptyState";
import {
  CheckboxField,
  SelectField,
  TextArea,
  TextField,
} from "@/components/admin/ui/Fields";
import { useToast } from "@/components/admin/providers/ToastProvider";
import useAdminProperties from "@/hooks/useAdminProperties";
import {
  PROPERTY_MARKETS,
  PROPERTY_STATUSES,
  PROPERTY_TYPES,
} from "@/lib/admin/constants";
import { slugify } from "@/lib/admin/utils";

const EMPTY_FORM = {
  title: "",
  slug: "",
  location: "",
  market: "buy",
  type: "Apartment",
  price: "",
  bedrooms: "",
  bathrooms: "",
  area: "",
  status: "available",
  featured: false,
  image: "",
  description: "",
};

function toForm(property) {
  return {
    title: property.title,
    slug: property.slug,
    location: property.location,
    market: property.market,
    type: property.type,
    price: String(property.price ?? ""),
    bedrooms: String(property.bedrooms ?? ""),
    bathrooms: String(property.bathrooms ?? ""),
    area: String(property.area ?? ""),
    status: property.status,
    featured: Boolean(property.featured),
    image: property.image || "",
    description: property.description || "",
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
        description="This listing is no longer in the local admin store."
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

  const setField = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  };

  const onTitleChange = (value) => {
    setForm((current) => ({
      ...current,
      title: value,
      slug: slugLocked ? current.slug : slugify(value),
    }));
    setErrors((current) => ({ ...current, title: undefined }));
  };

  const validation = useMemo(() => {
    const next = {};
    if (!form.title.trim()) next.title = "Title is required.";
    if (!form.slug.trim()) next.slug = "Slug is required.";
    if (!form.location.trim()) next.location = "Location is required.";
    if (form.price === "" || Number(form.price) < 0) {
      next.price = "Enter a valid price.";
    }
    return next;
  }, [form]);

  const onSubmit = (event) => {
    event.preventDefault();
    if (Object.keys(validation).length) {
      setErrors(validation);
      showToast("Please complete the required fields.", "error");
      return;
    }

    onSave(form);
    showToast(initialProperty ? "Property updated." : "Property added.");
    router.push("/admin/properties");
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <PageHeader
        eyebrow={eyebrow}
        title={title}
        description="Listings are stored locally for now. The same form will post to Supabase later."
      />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_20rem]">
        <div className="space-y-5 rounded-2xl border border-white/8 bg-[#161616] p-5 sm:p-6">
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
          />
          <TextField
            id="property-location"
            label="Location"
            value={form.location}
            onChange={(event) => setField("location", event.target.value)}
            error={errors.location}
            placeholder="Dubai Marina, Dubai"
          />
          <div className="grid gap-4 sm:grid-cols-2">
            <SelectField
              id="property-market"
              label="Market"
              value={form.market}
              onChange={(event) => setField("market", event.target.value)}
              options={PROPERTY_MARKETS.map((item) => ({
                value: item,
                label: item,
              }))}
            />
            <SelectField
              id="property-type"
              label="Type"
              value={form.type}
              onChange={(event) => setField("type", event.target.value)}
              options={PROPERTY_TYPES}
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
          <TextArea
            id="property-description"
            label="Description"
            rows={6}
            value={form.description}
            onChange={(event) => setField("description", event.target.value)}
            hint="Optional. Useful when you connect the public listing page."
            placeholder="Describe the home, community, and standout features."
          />
        </div>

        <aside className="space-y-5 rounded-2xl border border-white/8 bg-[#161616] p-5 sm:p-6">
          <ImageUploader
            label="Listing image"
            value={form.image}
            onChange={(value) => setField("image", value)}
            error={errors.image}
          />
          <SelectField
            id="property-status"
            label="Status"
            value={form.status}
            onChange={(event) => setField("status", event.target.value)}
            options={PROPERTY_STATUSES}
          />
          <CheckboxField
            id="property-featured"
            label="Feature this listing"
            checked={form.featured}
            onChange={(checked) => setField("featured", checked)}
          />
        </aside>
      </div>

      <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
        <AdminButton
          variant="secondary"
          onClick={() => router.push("/admin/properties")}
        >
          Cancel
        </AdminButton>
        <AdminButton type="submit">{submitLabel}</AdminButton>
      </div>
    </form>
  );
}
