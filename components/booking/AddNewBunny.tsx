"use client";

import { Bunny } from "@/lib/types";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { Button } from "../ui/button";
import { useState } from "react";
import { AddNewBunnyModal } from "./AddNewBunnyModal";

interface AddNewBunnyProps {
  bunnies: Bunny[];
  setBunnies: (bunnies: Bunny[]) => void;
}

export const AddNewBunny = ({ bunnies, setBunnies }: AddNewBunnyProps) => {
  const [showModal, setShowModal] = useState(false);
  const [newBunny, setNewBunny] = useState<Omit<Bunny, "picture">>({
    name: "",
    isVaccinated: false,
    isSpayed: false,
    isMale: true,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newBunny.name.trim()) {
      setBunnies([...bunnies, { ...newBunny, picture: undefined }]);
      // Reset form
      setNewBunny({
        name: "",
        isVaccinated: false,
        isSpayed: false,
        isMale: true,
      });
    }
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Add New Bunny
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Bunny Name */}
          <div className="space-y-2">
            <Label htmlFor="bunny-name">Bunny Name</Label>
            <Input
              id="bunny-name"
              placeholder="Enter bunny name"
              value={newBunny.name}
              onChange={(e) =>
                setNewBunny({ ...newBunny, name: e.target.value })
              }
              required
            />
          </div>

          {/* Gender Selection */}
          <div className="space-y-2">
            <Label>Gender</Label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  checked={newBunny.isMale}
                  onChange={() => setNewBunny({ ...newBunny, isMale: true })}
                  className="text-blue-600"
                />
                <span className="text-sm">Male</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  checked={!newBunny.isMale}
                  onChange={() => setNewBunny({ ...newBunny, isMale: false })}
                  className="text-pink-600"
                />
                <span className="text-sm">Female</span>
              </label>
            </div>
          </div>
        </div>

        {/* Checkboxes */}
        <div className="flex gap-6">
          <div className="flex items-center gap-2">
            <Checkbox
              id="vaccinated"
              checked={newBunny.isVaccinated}
              onCheckedChange={(checked) =>
                setNewBunny({ ...newBunny, isVaccinated: checked as boolean })
              }
            />
            <Label htmlFor="vaccinated">Vaccinated</Label>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="spayed"
              checked={newBunny.isSpayed}
              onCheckedChange={(checked) =>
                setNewBunny({ ...newBunny, isSpayed: checked as boolean })
              }
            />
            <Label htmlFor="spayed">Spayed/Neutered</Label>
          </div>
        </div>

        <Button className="w-full md:w-auto" onClick={() => setShowModal(true)}>
          Add Bunny
        </Button>
      </form>
    </div>
  );
};
