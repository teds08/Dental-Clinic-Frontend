"use client";

import Image from "next/image";
import { ImagePlus, X } from "lucide-react";
import { useState } from "react";

import type { DummyService } from "@/data/admin/services/services";

interface ServiceFormDialogProps {
  isOpen: boolean;
  service?: DummyService | null;
  onClose: () => void;
  onSubmit?: (service: DummyService) => void;
}

export function ServiceFormDialog({
  isOpen,
  service,
  onClose,
  onSubmit,
}: ServiceFormDialogProps) {
  const isEditMode = Boolean(service);

  const [title, setTitle] = useState(service?.title ?? "");
  const [description, setDescription] = useState(service?.description ?? "");
  const [price, setPrice] = useState(service ? String(service.price) : "");
  const [imagePreview, setImagePreview] = useState(service?.image ?? "");
  const [imageFile, setImageFile] = useState<File | null>(null);

  if (!isOpen) {
    return null;
  }

  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const previewUrl = URL.createObjectURL(file);

    setImageFile(file);
    setImagePreview(previewUrl);
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!title.trim() || !description.trim() || !price) {
      return;
    }

    const submittedService: DummyService = {
      id: service?.id ?? Date.now(),
      title: title.trim(),
      description: description.trim(),
      price: Number(price),
      image: imagePreview,
      status: service?.status ?? "active",
      createdAt: service?.createdAt ?? new Date().toISOString(),
    };

    console.log("Image file:", imageFile);

    console.log(
      isEditMode ? "Updating service:" : "Creating service:",
      submittedService,
    );

    onSubmit?.(submittedService);
    onClose();
  }

  function handleClose() {
    setTitle("");
    setDescription("");
    setPrice("");
    setImagePreview("");
    setImageFile(null);

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
              {isEditMode ? "Edit Service" : "Add Service"}
            </h2>

            <p className="mt-1 text-xs text-gray-500">
              {isEditMode
                ? "Update the information for this dental service."
                : "Add a new dental service to the clinic."}
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Close dialog"
            className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-lg text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          >
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="max-h-[calc(90vh-145px)] space-y-5 overflow-y-auto p-5 sm:p-6">
            {/* Image */}
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
                    unoptimized={imagePreview.startsWith("blob:")}
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
                  className="sr-only"
                />
              </label>
            </div>

            {/* Title */}
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
                className="mt-2 h-10 w-full rounded-xl border border-gray-200 bg-gray-50 px-3.5 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-teal-300 focus:bg-white focus:ring-2 focus:ring-teal-50"
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
                className="mt-2 w-full resize-none rounded-xl border border-gray-200 bg-gray-50 px-3.5 py-3 text-sm leading-6 text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-teal-300 focus:bg-white focus:ring-2 focus:ring-teal-50"
              />
            </div>

            {/* Price */}
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
                  className="h-10 w-full rounded-xl border border-gray-200 bg-gray-50 pl-8 pr-3.5 text-sm text-gray-900 outline-none transition-colors placeholder:text-gray-400 focus:border-teal-300 focus:bg-white focus:ring-2 focus:ring-teal-50"
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col-reverse gap-3 border-t border-gray-100 px-5 py-4 sm:flex-row sm:justify-end sm:px-6">
            <button
              type="button"
              onClick={handleClose}
              className="h-10 w-full cursor-pointer rounded-xl border border-gray-200 bg-white px-4 text-sm font-semibold text-gray-600 transition-colors hover:bg-gray-50 sm:w-auto"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="h-10 w-full cursor-pointer rounded-xl bg-teal-700 px-5 text-sm font-semibold text-white transition-colors hover:bg-teal-800 sm:w-auto"
            >
              {isEditMode ? "Save Changes" : "Add Service"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
