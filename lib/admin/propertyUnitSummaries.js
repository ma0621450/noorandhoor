import {
  normalizeUnitGroups,
  unitTypeDisplayName,
  unitTypeShortName,
} from "@/lib/admin/propertyUnits";

function formatArea(value) {
  const number = Number(value);
  if (!Number.isFinite(number) || number <= 0) return "";
  return `${number.toLocaleString("en-AE", { maximumFractionDigits: 0 })} sqft`;
}

function formatMoney(value) {
  const number = Number(value);
  if (!Number.isFinite(number) || number < 0) return "";
  return `${number.toLocaleString("en-AE", { maximumFractionDigits: 0 })} AED`;
}

function minPositive(values) {
  const nums = values
    .map((value) => Number(value))
    .filter((value) => Number.isFinite(value) && value > 0);
  if (!nums.length) return null;
  return Math.min(...nums);
}

function maxPositive(values) {
  const nums = values
    .map((value) => Number(value))
    .filter((value) => Number.isFinite(value) && value > 0);
  if (!nums.length) return null;
  return Math.max(...nums);
}

export function buildUnitTypeSummaries(groups = []) {
  return normalizeUnitGroups(groups).map((group) => {
    const displayName = unitTypeDisplayName(group);
    const areas = group.units.map((unit) => unit.areaSqft);
    const prices = group.units.map((unit) => unit.price);
    const minArea = minPositive(areas);
    const maxArea = maxPositive(areas);
    const minPrice = minPositive(prices);
    const maxPrice = maxPositive(prices);

    let areaLabel = "";
    if (minArea != null && maxArea != null && minArea !== maxArea) {
      areaLabel = `${formatArea(minArea)} – ${formatArea(maxArea)}`;
    } else if (minArea != null) {
      areaLabel = formatArea(minArea);
    }

    let priceLabel = "";
    if (minPrice != null && maxPrice != null && minPrice !== maxPrice) {
      priceLabel = `From ${formatMoney(minPrice)} – ${formatMoney(maxPrice)}`;
    } else if (minPrice != null) {
      priceLabel = `From ${formatMoney(minPrice)}`;
    }

    return {
      ...group,
      displayName,
      bedroomsLabel: displayName,
      inventoryLabel: `${group.inventoryCount} unit${
        group.inventoryCount === 1 ? "" : "s"
      }`,
      areaLabel,
      priceLabel,
      minArea,
      minPrice,
      units: group.units.map((unit) => {
        const area = Number(unit.areaSqft);
        const price = Number(unit.price);
        const perSqft =
          Number.isFinite(area) &&
          area > 0 &&
          Number.isFinite(price) &&
          price > 0
            ? Math.round(price / area)
            : null;

        return {
          ...unit,
          bedroomsLabel: displayName,
          areaLabel: formatArea(unit.areaSqft),
          priceLabel: formatMoney(unit.price),
          // Hide nonsense ratios from tiny test prices (e.g. 345/455 ≈ 1).
          pricePerSqftLabel:
            perSqft != null && perSqft >= 100
              ? `${perSqft.toLocaleString("en-AE")} AED/sqft`
              : "",
        };
      }),
    };
  });
}

export function buildInventoryOverview(groups = []) {
  return buildUnitTypeSummaries(groups).map((group) => ({
    id: group.clientKey || group.id || group.slug,
    name: group.displayName,
    accentColor: group.accentColor,
    inventoryLabel: group.inventoryLabel,
    fromAreaLabel:
      group.minArea != null ? `from ${formatArea(group.minArea)}` : "",
  }));
}

export function buildParkingGroups(groups = []) {
  const map = new Map();

  for (const group of normalizeUnitGroups(groups)) {
    if (group.parkingSpaces <= 0) continue;
    const key = group.parkingSpaces;
    if (!map.has(key)) map.set(key, []);
    map.get(key).push({
      id: group.clientKey || group.id || group.slug,
      name: unitTypeDisplayName(group),
      shortName: unitTypeShortName(group),
    });
  }

  return [...map.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([parkingSpaces, types]) => ({
      parkingSpaces,
      label: parkingSpaces === 1 ? "1 Parking" : `${parkingSpaces} Parkings`,
      types,
    }));
}

export function hasUnitAvailability(groups = []) {
  return normalizeUnitGroups(groups).length > 0;
}
