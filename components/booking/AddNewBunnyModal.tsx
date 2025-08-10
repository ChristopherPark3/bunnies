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
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "../ui/kibo-ui/dropzone";
import { Button } from "../ui/button";

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
  const handleSave = () => {
    if (bunnyToAdd.name.trim()) {
      onSave(bunnyToAdd);
    }
  };

  const handleCancel = () => {
    onCancel();
    setShowModal(false);
  };

  const handleDelete = () => {
    if (isEditing && editingBunnyIndex !== null) {
      // This will be handled by the parent component
      // We'll need to pass a delete function down
      setShowModal(false);
    }
  };

  return (
    <Dialog open={showModal} onOpenChange={setShowModal}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
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
        <div className="flex flex-col gap-1">
          <Label>Add some pictures if you&apos;d like!</Label>
          <Dropzone>
            <DropzoneContent />
            <DropzoneEmptyState />
          </Dropzone>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          {isEditing && (
            <Button 
              variant="destructive" 
              onClick={handleDelete}
              className="mr-auto"
            >
              Delete
            </Button>
          )}
          <Button onClick={handleSave} disabled={!bunnyToAdd.name.trim()}>
            {isEditing ? "Update" : "Save"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
