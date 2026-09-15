"use client";

import Image from "next/image";
import { ImagePlus, X } from "lucide-react";
import { useState } from "react";

import { createService, updateService } from "@/lib/api/admin/services";

import {
  serviceCategories,
  serviceDurations,
  serviceIcons,
} from "@/data/admin/services/services";

import type {
  AdminService,
  ServiceCategory,
  ServiceIcon,
} from "@/types/admin/services";

export interface ServiceFormData {
  title: string;
  description: string;
  price: string;
  points: string;
  duration_minutes: number;
  category: ServiceCategory;
  icon: ServiceIcon;
  imageFile: File | null;
  imagePreview: string;
}

interface ServiceFormDialogProps {
  isOpen: boolean;
  service?: AdminService | null;
  onClose: () => void;
  onSubmit?: (data: ServiceFormData) => void | Promise<void>;
}

export function ServiceFormDialog({
  isOpen,
  service,
  onClose,
  onSubmit,
}: ServiceFormDialogProps) {
  const [title, setTitle] = useState(service?.title ?? "");

  const [description, setDescription] = useState(service?.description ?? "");

  const [price, setPrice] = useState(service?.price ?? "");

  const [points, setPoints] = useState(service ? String(service.points) : "");

  const [durationMinutes, setDurationMinutes] = useState(
    service ? String(service.duration_minutes) : "60",
  );

  const [category, setCategory] = useState<ServiceCategory>(
    service?.category ?? "Preventive",
  );

  const [selectedIcon, setSelectedIcon] = useState<ServiceIcon>(
    service?.icon ?? "dental-care",
  );

  const [imagePreview, setImagePreview] = useState(service?.image ?? "");

  const [imageFile, setImageFile] = useState<File | null>(null);

  const [errorMessage, setErrorMessage] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) {
    return null;
  }

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    if (!file.type.startsWith("image/")) {
      setErrorMessage("Please select a valid image file.");
      return;
    }

    const previewUrl = URL.createObjectURL(file);

    setImageFile(file);
    setImagePreview(previewUrl);
    setErrorMessage("");
  }

  function validateForm() {
    if (!service && !imageFile) {
      return "Please upload a service image.";
    }

    if (!title.trim()) {
      return "Please enter a service title.";
    }

    if (!description.trim()) {
      return "Please enter a service description.";
    }

    if (!price || Number(price) < 0) {
      return "Please enter a valid service price.";
    }

    if (!points || Number(points) < 0) {
      return "Please enter a valid points value.";
    }

    if (!durationMinutes) {
      return "Please select a service duration.";
    }

    if (!category) {
      return "Please select a service category.";
    }

    if (!selectedIcon) {
      return "Please select a service icon.";
    }

    return null;
  }

  function buildCreateFormData() {
    if (!imageFile) {
      return null;
    }

    const formData = new FormData();

    formData.append("image", imageFile);
    formData.append("title", title.trim());
    formData.append("description", description.trim());
    formData.append("price", price);
    formData.append("points", points);
    formData.append("duration_minutes", durationMinutes);
    formData.append("icon", selectedIcon);
    formData.append("category", category);

    return formData;
  }

  function buildUpdateFormData() {
    if (!service) {
      return null;
    }

    const formData = new FormData();

    const currentTitle = title.trim();
    const currentDescription = description.trim();
    const currentPrice = price;
    const currentPoints = Number(points);
    const currentDuration = Number(durationMinutes);

    if (currentTitle !== service.title) {
      formData.append("title", currentTitle);
    }

    if (currentDescription !== service.description) {
      formData.append("description", currentDescription);
    }

    if (currentPrice !== service.price) {
      formData.append("price", currentPrice);
    }

    if (currentPoints !== service.points) {
      formData.append("points", String(currentPoints));
    }

    if (currentDuration !== service.duration_minutes) {
      formData.append("duration_minutes", String(currentDuration));
    }

    if (category !== service.category) {
      formData.append("category", category);
    }

    if (selectedIcon !== service.icon) {
      formData.append("icon", selectedIcon);
    }

    if (imageFile) {
      formData.append("image", imageFile);
    }

    return formData;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErrorMessage("");

    const validationError = validateForm();

    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    try {
      setIsSubmitting(true);

      if (service) {
        const formData = buildUpdateFormData();

        if (!formData) {
          throw new Error("Unable to prepare service update.");
        }

        if ([...formData.keys()].length === 0) {
          setErrorMessage("No changes were made to the service.");
          return;
        }

        const response = await updateService(service.id, formData);

        console.log("Service updated:", response);

        const submittedData: ServiceFormData = {
          title: title.trim(),
          description: description.trim(),
          price,
          points,
          duration_minutes: Number(durationMinutes),
          category,
          icon: selectedIcon,
          imageFile,
          imagePreview: response.service.image,
        };

        await onSubmit?.(submittedData);

        handleClose();

        return;
      }

      const formData = buildCreateFormData();

      if (!formData) {
        setErrorMessage("Please upload a service image.");
        return;
      }

      const response = await createService(formData);

      console.log("Service created:", response);

      const submittedData: ServiceFormData = {
        title: title.trim(),
        description: description.trim(),
        price,
        points,
        duration_minutes: Number(durationMinutes),
        category,
        icon: selectedIcon,
        imageFile,
        imagePreview: response.service.image,
      };

      await onSubmit?.(submittedData);

      handleClose();
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : service
            ? "Failed to update service."
            : "Failed to create service.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleClose() {
    if (isSubmitting) {
      return;
    }

    setTitle("");
    setDescription("");
    setPrice("");
    setPoints("");
    setDurationMinutes("60");
    setCategory("Preventive");
    setSelectedIcon("dental-care");
    setImageFile(null);
    setImagePreview("");
    setErrorMessage("");
    setIsSubmitting(false);

    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/40 p-4 backdrop-blur-sm"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          handleClose();
        }
      }}
    >
      <div className="max-h-[90vh] w-full max-w-xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-2xl">
        {/* Header */}
        <div className="flex items-start justify-between border-b border-gray-100 px-5 py-4 sm:px-6">
          <div>
            <h2 className="text-base font-semibold text-gray-900">
              {service ? "Edit Service" : "Add Service"}
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              {service
                ? "Update the dental service information."
                : "Add a new dental service to the clinic."}
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            disabled={isSubmitting}
            aria-label="Close dialog"
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="max-h-[calc(90vh-145px)] space-y-5 overflow-y-auto p-5 sm:p-6">
            {/* Service Image */}
            <div>
              <label className="text-sm font-semibold text-gray-900">
                Service Image
              </label>

              <label className="relative mt-2 flex aspect-[16/7] cursor-pointer items-center justify-center overflow-hidden rounded-xl border border-dashed border-gray-300 bg-gray-50 transition-colors hover:border-teal-300 hover:bg-teal-50/30">
                {imagePreview ? (
                  <Image
                    src={imagePreview}
                    alt="Service preview"
                    fill
                    unoptimized
                    sizes="(max-width: 640px) 100vw, 576px"
                    className="object-cover"
                  />
                ) : (
                  <div className="text-center">
                    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-white text-gray-400 shadow-sm">
                      <ImagePlus size={19} strokeWidth={1.8} />
                    </div>

                    <p className="mt-3 text-xs font-semibold text-gray-600">
                      Upload service image
                    </p>

                    <p className="mt-1 text-[11px] text-gray-400">
                      PNG, JPG or WEBP
                    </p>
                  </div>
                )}

                <input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  onChange={handleImageChange}
                  disabled={isSubmitting}
                  className="sr-only"
                />
              </label>
            </div>

            {/* Service Title */}
            <div>
              <label
                htmlFor="service-title"
                className="text-sm font-semibold text-gray-900"
              >
                Service Title
              </label>

              <input
                id="service-title"
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                placeholder="e.g. Dental Cleaning"
                disabled={isSubmitting}
                className="mt-2 h-10 w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-teal-300 focus:bg-white focus:ring-2 focus:ring-teal-50 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>

            {/* Description */}
            <div>
              <label
                htmlFor="service-description"
                className="text-sm font-semibold text-gray-900"
              >
                Description
              </label>

              <textarea
                id="service-description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                placeholder="Describe the service..."
                rows={4}
                disabled={isSubmitting}
                className="mt-2 w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-3 text-sm leading-6 text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-teal-300 focus:bg-white focus:ring-2 focus:ring-teal-50 disabled:cursor-not-allowed disabled:opacity-60"
              />
            </div>

            {/* Price + Points */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="service-price"
                  className="text-sm font-semibold text-gray-900"
                >
                  Price
                </label>

                <div className="relative mt-2">
                  <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-sm font-medium text-gray-400">
                    ₱
                  </span>

                  <input
                    id="service-price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={price}
                    onChange={(event) => setPrice(event.target.value)}
                    placeholder="0.00"
                    disabled={isSubmitting}
                    className="h-10 w-full rounded-xl border border-gray-200 bg-gray-50 pl-8 pr-3.5 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-teal-300 focus:bg-white focus:ring-2 focus:ring-teal-50 disabled:cursor-not-allowed disabled:opacity-60"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="service-points"
                  className="text-sm font-semibold text-gray-900"
                >
                  Points
                </label>

                <input
                  id="service-points"
                  type="number"
                  min="0"
                  step="1"
                  value={points}
                  onChange={(event) => setPoints(event.target.value)}
                  placeholder="e.g. 30"
                  disabled={isSubmitting}
                  className="mt-2 h-10 w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-teal-300 focus:bg-white focus:ring-2 focus:ring-teal-50 disabled:cursor-not-allowed disabled:opacity-60"
                />
              </div>
            </div>

            {/* Duration + Category */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="service-duration"
                  className="text-sm font-semibold text-gray-900"
                >
                  Duration
                </label>

                <select
                  id="service-duration"
                  value={durationMinutes}
                  onChange={(event) => setDurationMinutes(event.target.value)}
                  disabled={isSubmitting}
                  className="mt-2 h-10 w-full cursor-pointer rounded-xl border border-gray-200 bg-gray-50 px-3.5 text-sm text-gray-700 outline-none transition-colors focus:border-teal-300 focus:bg-white focus:ring-2 focus:ring-teal-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {serviceDurations.map((duration) => (
                    <option key={duration.value} value={duration.value}>
                      {duration.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="service-category"
                  className="text-sm font-semibold text-gray-900"
                >
                  Category
                </label>

                <select
                  id="service-category"
                  value={category}
                  onChange={(event) =>
                    setCategory(event.target.value as ServiceCategory)
                  }
                  disabled={isSubmitting}
                  className="mt-2 h-10 w-full cursor-pointer rounded-xl border border-gray-200 bg-gray-50 px-3.5 text-sm text-gray-700 outline-none transition-colors focus:border-teal-300 focus:bg-white focus:ring-2 focus:ring-teal-50 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {serviceCategories.map((serviceCategory) => (
                    <option key={serviceCategory} value={serviceCategory}>
                      {serviceCategory}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Service Icon */}
            <div>
              <p className="text-sm font-semibold text-gray-900">
                Service Icon
              </p>

              <p className="mt-1 text-xs text-gray-400">
                Choose an icon to represent this service.
              </p>

              <div className="mt-3 grid grid-cols-5 gap-2">
                {serviceIcons.map((serviceIcon) => {
                  const isSelected = selectedIcon === serviceIcon.value;

                  return (
                    <button
                      key={serviceIcon.value}
                      type="button"
                      title={serviceIcon.label}
                      aria-label={`Select ${serviceIcon.label} icon`}
                      aria-pressed={isSelected}
                      onClick={() => setSelectedIcon(serviceIcon.value)}
                      disabled={isSubmitting}
                      className={`flex aspect-square cursor-pointer flex-col items-center justify-center rounded-xl border transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-60 ${
                        isSelected
                          ? "border-teal-300 bg-teal-50 ring-2 ring-teal-100"
                          : "border-gray-200 bg-white hover:border-teal-200 hover:bg-teal-50/50"
                      }`}
                    >
                      <Image
                        src={serviceIcon.src}
                        alt={serviceIcon.label}
                        width={40}
                        height={40}
                        className="h-10 w-auto object-contain"
                      />

                      <span
                        className={`mt-1 hidden text-[9px] font-medium sm:block ${
                          isSelected ? "text-teal-700" : "text-gray-500"
                        }`}
                      >
                        {serviceIcon.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="rounded-xl border border-red-100 bg-red-50 px-3.5 py-3 text-sm text-red-600">
                {errorMessage}
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex flex-col-reverse gap-3 border-t border-gray-100 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="h-10 w-full cursor-pointer rounded-xl border border-gray-200 bg-white px-4 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="h-10 w-full cursor-pointer rounded-xl bg-teal-700 px-5 text-sm font-semibold text-white transition-colors hover:bg-teal-800 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
            >
              {isSubmitting
                ? service
                  ? "Updating..."
                  : "Creating..."
                : service
                  ? "Update Service"
                  : "Add Service"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
