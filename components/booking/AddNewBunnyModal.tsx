"use client";

import { Bunny } from "@/lib/types";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Dropzone } from "../ui/kibo-ui/dropzone";
import { Button } from "../ui/button";
import { useState, useEffect } from "react";
import { X, Upload, Image as ImageIcon } from "lucide-react";

interface AddNewBunnyModalProps {
  showModal: boolean;
  setShowModal: (showModal: boolean) => void;
  bunnyToAdd: Bunny;
  setBunnyToAdd: (bunny: Bunny) => void;
  onSave: (bunny: Bunny) => void;
  onCancel: () => void;
  isEditing?: boolean;
  editingBunnyIndex?: number | null;
}

export const AddNewBunnyModal = ({
  showModal,
  setShowModal,
  bunnyToAdd,
  setBunnyToAdd,
  onSave,
  onCancel,
  isEditing = false,
  editingBunnyIndex,
}: AddNewBunnyModalProps) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Reset uploaded file when modal opens/closes or when editing changes
  useEffect(() => {
    if (!showModal) {
      setUploadedFile(null);
      setPreviewUrl(null);
    }
  }, [showModal]);

  const handleSave = () => {
    if (bunnyToAdd.name.trim()) {
      if (uploadedFile) {
        // Convert uploaded file to data URL for storage
        const reader = new FileReader();
        reader.onload = (e) => {
          const bunnyWithPicture = {
            ...bunnyToAdd,
            picture: e.target?.result as string,
          };
          onSave(bunnyWithPicture);
        };
        reader.readAsDataURL(uploadedFile);
      } else {
        // No new file uploaded, save with existing picture
        onSave(bunnyToAdd);
      }
    }
  };

  const handleCancel = () => {
    onCancel();
    setShowModal(false);
    setUploadedFile(null);
    setPreviewUrl(null);
  };

  const handleDelete = () => {
    if (isEditing && editingBunnyIndex !== null) {
      // This will be handled by the parent component
      setShowModal(false);
    }
  };

  const handleFileDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setUploadedFile(file);
      // Create preview URL
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const removePicture = () => {
    setUploadedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
  };

  const removeExistingPicture = () => {
    setBunnyToAdd({
      ...bunnyToAdd,
      picture: undefined,
    });
  };

  // Determine which picture to show
  const currentPicture = uploadedFile ? previewUrl : bunnyToAdd.picture;
  const hasPicture = !!currentPicture;

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="text-start">
            {isEditing ? `Edit ${bunnyToAdd.name}` : "Add a new bunny"}
          </DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-1">
          <Label>Name</Label>
          <Input
            placeholder="Bunny Name"
            value={bunnyToAdd?.name}
            onChange={(e) =>
              setBunnyToAdd({
                ...bunnyToAdd,
                name: e.target.value,
              })
            }
          />
        </div>

        <div className="flex flex-row gap-4">
          <div className="flex flex-col gap-1">
            <Label>Is vaccinated?</Label>
            <Checkbox
              checked={bunnyToAdd?.isVaccinated}
              onCheckedChange={(checked) =>
                setBunnyToAdd({
                  ...bunnyToAdd,
                  isVaccinated: checked as boolean,
                })
              }
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label>Is spayed/neutered?</Label>
            <Checkbox
              checked={bunnyToAdd?.isSpayed}
              onCheckedChange={(checked) =>
                setBunnyToAdd({
                  ...bunnyToAdd,
                  isSpayed: checked as boolean,
                })
              }
            />
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <Label>Gender</Label>
          <div className="flex gap-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="male"
                checked={bunnyToAdd?.isMale}
                onCheckedChange={(checked) =>
                  setBunnyToAdd({
                    ...bunnyToAdd,
                    isMale: checked as boolean,
                  })
                }
              />
              <Label htmlFor="male">Male</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="female"
                checked={!bunnyToAdd?.isMale}
                onCheckedChange={(checked) =>
                  setBunnyToAdd({
                    ...bunnyToAdd,
                    isMale: !checked,
                  })
                }
              />
              <Label htmlFor="female">Female</Label>
            </div>
          </div>
        </div>

        {/* Picture Section */}
        <div className="flex flex-col gap-3">
          <Label>{hasPicture ? "Current photo" : "Upload a photo"}</Label>

          {/* Current Picture Display */}
          {hasPicture && (
            <div className="flex flex-col gap-2">
              <div className="relative inline-block w-fit">
                <img
                  src={currentPicture}
                  alt={`${bunnyToAdd.name || "Bunny"}`}
                  className="w-32 h-32 object-cover rounded-lg border-2 border-gray-200"
                />
                <Button
                  size="sm"
                  variant="destructive"
                  className="absolute -top-2 -right-2 w-6 h-6 p-0 rounded-full shadow-lg"
                  onClick={uploadedFile ? removePicture : removeExistingPicture}
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            </div>
          )}

          {/* Upload Area - Only show if no picture is currently displayed */}
          {!hasPicture && (
            <div className="flex flex-col gap-2">
              <Dropzone
                accept={{
                  "image/png": [".png"],
                  "image/jpeg": [".jpg", ".jpeg"],
                }}
                maxFiles={1}
                maxSize={5 * 1024 * 1024} // 5MB limit
                onDrop={handleFileDrop}
                className="border-2 border-dashed border-gray-300 hover:border-gray-400 transition-colors"
              >
                <div className="flex flex-col items-center justify-center p-6 text-center">
                  <ImageIcon className="w-8 h-8 text-gray-400 mb-2" />
                  <p className="text-sm font-medium text-gray-700 mb-1">
                    Upload a picture
                  </p>
                  <p className="text-xs text-gray-500">PNG or JPEG • Max 5MB</p>
                </div>
              </Dropzone>
            </div>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={!bunnyToAdd.name.trim()}
            className="bg-sage text-white hover:bg-sage/80"
          >
            {isEditing ? "Update" : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
