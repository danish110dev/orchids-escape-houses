"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GEH_API } from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  ChevronLeft,
  ChevronRight,
  Save,
  CheckCircle,
  Home,
  MapPin,
  Bed,
  Star,
  FileText,
  DollarSign,
  Image as ImageIcon,
  Search,
} from "lucide-react";
import { toast } from "sonner";

interface PropertyFormData {
  // Essentials
  title: string;
  address: string;
  max_guests: number;
  base_price: number;
  status: "draft" | "active" | "inactive";
  
  // Location
  town: string;
  region: string;
  postcode: string;
  latitude?: number;
  longitude?: number;
  
  // Rooms
  bedrooms: number;
  bathrooms: number;
  beds: number;
  
  // Amenities
  amenities: string[];
  
  // Policies
  check_in_time: string;
  check_out_time: string;
  house_rules: string;
  cancellation_policy: string;
  
  // Pricing
  weekend_price: number;
  midweek_price: number;
  cleaning_fee: number;
  security_deposit: number;
  
  // Media
  images: string[];
  video_url?: string;
  
  // SEO
  meta_title: string;
  meta_description: string;
  slug: string;
}

const STEPS = [
  { id: 1, name: "Essentials", icon: Home },
  { id: 2, name: "Location", icon: MapPin },
  { id: 3, name: "Rooms", icon: Bed },
  { id: 4, name: "Amenities", icon: Star },
  { id: 5, name: "Policies", icon: FileText },
  { id: 6, name: "Pricing", icon: DollarSign },
  { id: 7, name: "Media", icon: ImageIcon },
  { id: 8, name: "SEO", icon: Search },
];

const AMENITIES_OPTIONS = [
  "Hot Tub",
  "Swimming Pool",
  "Indoor Pool",
  "Games Room",
  "Cinema Room",
  "BBQ",
  "Parking",
  "WiFi",
  "Pet Friendly",
  "EV Charging",
  "Garden",
  "Gym",
  "Sauna",
  "Tennis Court",
  "Beach Access",
];

export default function NewPropertyPage() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<PropertyFormData>({
    title: "",
    address: "",
    max_guests: 8,
    base_price: 0,
    status: "draft",
    town: "",
    region: "",
    postcode: "",
    bedrooms: 1,
    bathrooms: 1,
    beds: 1,
    amenities: [],
    check_in_time: "15:00",
    check_out_time: "10:00",
    house_rules: "",
    cancellation_policy: "",
    weekend_price: 0,
    midweek_price: 0,
    cleaning_fee: 0,
    security_deposit: 0,
    images: [],
    meta_title: "",
    meta_description: "",
    slug: "",
  });

  const updateFormData = (field: keyof PropertyFormData, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1: // Essentials
        if (!formData.title.trim()) {
          toast.error("Title is required");
          return false;
        }
        if (!formData.address.trim()) {
          toast.error("Address is required");
          return false;
        }
        if (formData.max_guests < 1) {
          toast.error("Max guests must be at least 1");
          return false;
        }
        if (formData.base_price <= 0) {
          toast.error("Base price is required");
          return false;
        }
        return true;
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(STEPS.length, prev + 1));
    }
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const handleSave = async (isDraft = false) => {
    if (!isDraft && !validateStep(1)) {
      return;
    }

    setSaving(true);
    try {
      const payload = {
        ...formData,
        status: isDraft ? "draft" : formData.status,
      };

      await GEH_API.post("/properties", payload);
      
      toast.success(isDraft ? "Saved as draft" : "Property created successfully");
      router.push("/admin/properties");
    } catch (error: any) {
      console.error("Failed to save property:", error);
      toast.error(error.message || "Failed to save property");
    } finally {
      setSaving(false);
    }
  };

  const toggleAmenity = (amenity: string) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1: // Essentials
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="title">Property Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => updateFormData("title", e.target.value)}
                placeholder="e.g., The Brighton Manor"
              />
            </div>

            <div>
              <Label htmlFor="address">Address *</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => updateFormData("address", e.target.value)}
                placeholder="Full address"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="max_guests">Max Guests *</Label>
                <Input
                  id="max_guests"
                  type="number"
                  min="1"
                  value={formData.max_guests}
                  onChange={(e) =>
                    updateFormData("max_guests", parseInt(e.target.value))
                  }
                />
              </div>

              <div>
                <Label htmlFor="base_price">Base Price (£) *</Label>
                <Input
                  id="base_price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.base_price}
                  onChange={(e) =>
                    updateFormData("base_price", parseFloat(e.target.value))
                  }
                />
              </div>
            </div>

            <div>
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => updateFormData("status", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        );

      case 2: // Location
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="town">Town</Label>
              <Input
                id="town"
                value={formData.town}
                onChange={(e) => updateFormData("town", e.target.value)}
                placeholder="e.g., Brighton"
              />
            </div>

            <div>
              <Label htmlFor="region">Region</Label>
              <Input
                id="region"
                value={formData.region}
                onChange={(e) => updateFormData("region", e.target.value)}
                placeholder="e.g., East Sussex"
              />
            </div>

            <div>
              <Label htmlFor="postcode">Postcode</Label>
              <Input
                id="postcode"
                value={formData.postcode}
                onChange={(e) => updateFormData("postcode", e.target.value)}
                placeholder="e.g., BN1 1AA"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="latitude">Latitude (optional)</Label>
                <Input
                  id="latitude"
                  type="number"
                  step="0.000001"
                  value={formData.latitude || ""}
                  onChange={(e) =>
                    updateFormData("latitude", parseFloat(e.target.value))
                  }
                  placeholder="50.8225"
                />
              </div>

              <div>
                <Label htmlFor="longitude">Longitude (optional)</Label>
                <Input
                  id="longitude"
                  type="number"
                  step="0.000001"
                  value={formData.longitude || ""}
                  onChange={(e) =>
                    updateFormData("longitude", parseFloat(e.target.value))
                  }
                  placeholder="-0.1372"
                />
              </div>
            </div>
          </div>
        );

      case 3: // Rooms
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="bedrooms">Bedrooms</Label>
              <Input
                id="bedrooms"
                type="number"
                min="1"
                value={formData.bedrooms}
                onChange={(e) =>
                  updateFormData("bedrooms", parseInt(e.target.value))
                }
              />
            </div>

            <div>
              <Label htmlFor="bathrooms">Bathrooms</Label>
              <Input
                id="bathrooms"
                type="number"
                min="1"
                value={formData.bathrooms}
                onChange={(e) =>
                  updateFormData("bathrooms", parseInt(e.target.value))
                }
              />
            </div>

            <div>
              <Label htmlFor="beds">Total Beds</Label>
              <Input
                id="beds"
                type="number"
                min="1"
                value={formData.beds}
                onChange={(e) =>
                  updateFormData("beds", parseInt(e.target.value))
                }
              />
            </div>
          </div>
        );

      case 4: // Amenities
        return (
          <div className="space-y-4">
            <Label>Select Amenities</Label>
            <div className="grid grid-cols-2 gap-4">
              {AMENITIES_OPTIONS.map((amenity) => (
                <div key={amenity} className="flex items-center space-x-2">
                  <Checkbox
                    id={amenity}
                    checked={formData.amenities.includes(amenity)}
                    onCheckedChange={() => toggleAmenity(amenity)}
                  />
                  <label
                    htmlFor={amenity}
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {amenity}
                  </label>
                </div>
              ))}
            </div>
          </div>
        );

      case 5: // Policies
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="check_in_time">Check-in Time</Label>
                <Input
                  id="check_in_time"
                  type="time"
                  value={formData.check_in_time}
                  onChange={(e) =>
                    updateFormData("check_in_time", e.target.value)
                  }
                />
              </div>

              <div>
                <Label htmlFor="check_out_time">Check-out Time</Label>
                <Input
                  id="check_out_time"
                  type="time"
                  value={formData.check_out_time}
                  onChange={(e) =>
                    updateFormData("check_out_time", e.target.value)
                  }
                />
              </div>
            </div>

            <div>
              <Label htmlFor="house_rules">House Rules</Label>
              <Textarea
                id="house_rules"
                value={formData.house_rules}
                onChange={(e) => updateFormData("house_rules", e.target.value)}
                placeholder="List your house rules..."
                rows={6}
              />
            </div>

            <div>
              <Label htmlFor="cancellation_policy">Cancellation Policy</Label>
              <Textarea
                id="cancellation_policy"
                value={formData.cancellation_policy}
                onChange={(e) =>
                  updateFormData("cancellation_policy", e.target.value)
                }
                placeholder="Describe your cancellation policy..."
                rows={4}
              />
            </div>
          </div>
        );

      case 6: // Pricing
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="weekend_price">Weekend Price (£)</Label>
                <Input
                  id="weekend_price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.weekend_price}
                  onChange={(e) =>
                    updateFormData("weekend_price", parseFloat(e.target.value))
                  }
                />
              </div>

              <div>
                <Label htmlFor="midweek_price">Midweek Price (£)</Label>
                <Input
                  id="midweek_price"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.midweek_price}
                  onChange={(e) =>
                    updateFormData("midweek_price", parseFloat(e.target.value))
                  }
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="cleaning_fee">Cleaning Fee (£)</Label>
                <Input
                  id="cleaning_fee"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.cleaning_fee}
                  onChange={(e) =>
                    updateFormData("cleaning_fee", parseFloat(e.target.value))
                  }
                />
              </div>

              <div>
                <Label htmlFor="security_deposit">Security Deposit (£)</Label>
                <Input
                  id="security_deposit"
                  type="number"
                  min="0"
                  step="0.01"
                  value={formData.security_deposit}
                  onChange={(e) =>
                    updateFormData(
                      "security_deposit",
                      parseFloat(e.target.value)
                    )
                  }
                />
              </div>
            </div>
          </div>
        );

      case 7: // Media
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="images">Image URLs (comma-separated)</Label>
              <Textarea
                id="images"
                value={formData.images.join(", ")}
                onChange={(e) =>
                  updateFormData(
                    "images",
                    e.target.value.split(",").map((url) => url.trim())
                  )
                }
                placeholder="https://example.com/image1.jpg, https://example.com/image2.jpg"
                rows={4}
              />
              <p className="text-sm text-gray-500 mt-1">
                Enter image URLs separated by commas
              </p>
            </div>

            <div>
              <Label htmlFor="video_url">Video URL (optional)</Label>
              <Input
                id="video_url"
                value={formData.video_url || ""}
                onChange={(e) => updateFormData("video_url", e.target.value)}
                placeholder="https://youtube.com/watch?v=..."
              />
            </div>
          </div>
        );

      case 8: // SEO
        return (
          <div className="space-y-6">
            <div>
              <Label htmlFor="slug">URL Slug</Label>
              <Input
                id="slug"
                value={formData.slug}
                onChange={(e) => updateFormData("slug", e.target.value)}
                placeholder="brighton-manor"
              />
              <p className="text-sm text-gray-500 mt-1">
                This will be used in the property URL
              </p>
            </div>

            <div>
              <Label htmlFor="meta_title">Meta Title</Label>
              <Input
                id="meta_title"
                value={formData.meta_title}
                onChange={(e) => updateFormData("meta_title", e.target.value)}
                placeholder="The Brighton Manor - Luxury Group Accommodation"
                maxLength={60}
              />
              <p className="text-sm text-gray-500 mt-1">
                {formData.meta_title.length}/60 characters
              </p>
            </div>

            <div>
              <Label htmlFor="meta_description">Meta Description</Label>
              <Textarea
                id="meta_description"
                value={formData.meta_description}
                onChange={(e) =>
                  updateFormData("meta_description", e.target.value)
                }
                placeholder="Luxury 8-bedroom manor house in Brighton with hot tub, pool, and games room. Perfect for hen parties and group celebrations."
                rows={3}
                maxLength={160}
              />
              <p className="text-sm text-gray-500 mt-1">
                {formData.meta_description.length}/160 characters
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const CurrentIcon = STEPS[currentStep - 1].icon;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <Button
            variant="ghost"
            onClick={() => router.push("/admin/properties")}
            className="mb-4"
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Back to Properties
          </Button>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Add New Property
          </h1>
          <p className="text-gray-600">
            Fill in the details across all sections to create your property listing
          </p>
        </div>

        {/* Progress Steps */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <div className="flex items-center justify-between">
            {STEPS.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;

              return (
                <div key={step.id} className="flex items-center">
                  <button
                    onClick={() => setCurrentStep(step.id)}
                    className={`flex flex-col items-center transition-colors ${
                      isActive
                        ? "text-[var(--color-accent-sage)]"
                        : isCompleted
                        ? "text-green-600"
                        : "text-gray-400"
                    }`}
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                        isActive
                          ? "bg-[var(--color-accent-sage)] text-white"
                          : isCompleted
                          ? "bg-green-100 text-green-600"
                          : "bg-gray-100 text-gray-400"
                      }`}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-5 h-5" />
                      ) : (
                        <Icon className="w-5 h-5" />
                      )}
                    </div>
                    <span className="text-xs font-medium hidden md:block">
                      {step.name}
                    </span>
                  </button>
                  {index < STEPS.length - 1 && (
                    <div
                      className={`h-px w-8 md:w-16 mx-2 ${
                        isCompleted ? "bg-green-600" : "bg-gray-300"
                      }`}
                    />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Content */}
        <div className="bg-white rounded-lg shadow p-8">
          <div className="flex items-center mb-6">
            <CurrentIcon className="w-6 h-6 text-[var(--color-accent-sage)] mr-3" />
            <h2 className="text-2xl font-semibold">
              {STEPS[currentStep - 1].name}
            </h2>
          </div>

          {renderStepContent()}

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between mt-8 pt-6 border-t border-gray-200">
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => handleSave(true)}
                disabled={saving}
              >
                <Save className="w-4 h-4 mr-2" />
                Save as Draft
              </Button>
            </div>

            <div className="flex gap-2">
              {currentStep > 1 && (
                <Button variant="outline" onClick={handlePrevious}>
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
              )}

              {currentStep < STEPS.length ? (
                <Button
                  onClick={handleNext}
                  style={{
                    background: "var(--color-accent-sage)",
                    color: "white",
                  }}
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  onClick={() => handleSave(false)}
                  disabled={saving}
                  style={{
                    background: "var(--color-accent-sage)",
                    color: "white",
                  }}
                >
                  {saving ? "Saving..." : "Create Property"}
                  <CheckCircle className="w-4 h-4 ml-2" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
