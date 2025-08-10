"use client";

import { Bunny } from "@/lib/types";
import { useState } from "react";
import { AddNewBunny } from "./AddNewBunny";
import { Button } from "../ui/button";
import { AddNewBunnyModal } from "./AddNewBunnyModal";

interface BunniesProps {
  onNext: () => void;
}

export const Bunnies = ({ onNext }: BunniesProps) => {
  const [showAddNewBunny, setShowAddNewBunny] = useState(false);
  const [bunnyToAdd, setBunnyToAdd] = useState<Bunny>({
    name: "",
    isVaccinated: false,
    isSpayed: false,
    isMale: true,
  });
  const [bunnies, setBunnies] = useState<Bunny[]>([
    {
      name: "Bunny 1",
      isVaccinated: true,
      isSpayed: true,
      isMale: true,
    },
    {
      name: "Bunny 2",
      isVaccinated: false,
      isSpayed: false,
      isMale: false,
    },
  ]);

  const [editingBunny, setEditingBunny] = useState<number | null>(null);
  const [editForm, setEditForm] = useState<Bunny>({
    name: "",
    isVaccinated: false,
    isSpayed: false,
    isMale: true,
  });

  const addBunny = (bunny: Bunny) => {
    setBunnies([...bunnies, bunny]);
    // Reset the form
    setBunnyToAdd({
      name: "",
      isVaccinated: false,
      isSpayed: false,
      isMale: true,
    });
    // Close the modal
    setShowAddNewBunny(false);
  };

  const editBunny = (bunny: Bunny) => {
    if (editingBunny !== null) {
      const updatedBunnies = [...bunnies];
      updatedBunnies[editingBunny] = bunny;
      setBunnies(updatedBunnies);
      setEditingBunny(null);
      setShowAddNewBunny(false);
    }
  };

  const deleteBunny = (index: number) => {
    const updatedBunnies = bunnies.filter((_, i) => i !== index);
    setBunnies(updatedBunnies);
  };

  const startEditing = (bunny: Bunny, index: number) => {
    setEditingBunny(index);
    setEditForm(bunny);
    setBunnyToAdd(bunny);
    setShowAddNewBunny(true);
  };

  const resetBunnyForm = () => {
    setBunnyToAdd({
      name: "",
      isVaccinated: false,
      isSpayed: false,
      isMale: true,
    });
    setEditingBunny(null);
  };

  const isEditing = editingBunny !== null;

  return (
    <div className="flex flex-col gap-6 w-full max-w-[800px]">
      <h1 className="text-3xl font-bold text-gray-800">Your Bunnies</h1>

      {/* Display existing bunnies */}
      <div className="space-y-4">
        {bunnies.map((bunny, index) => (
          <div key={index} className="p-4 border rounded-lg">
            <h3 className="font-semibold">{bunny.name}</h3>
            <p>Vaccinated: {bunny.isVaccinated ? "Yes" : "No"}</p>
            <p>Spayed/Neutered: {bunny.isSpayed ? "Yes" : "No"}</p>
            <p>Gender: {bunny.isMale ? "Male" : "Female"}</p>
            <div className="flex gap-2 mt-3">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => startEditing(bunny, index)}
              >
                Edit
              </Button>
              <Button 
                variant="destructive" 
                size="sm"
                onClick={() => deleteBunny(index)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Add New Bunny Form */}
      <Button onClick={() => setShowAddNewBunny(true)} className="w-fit">
        Add another bunny
      </Button>
      <AddNewBunnyModal
        showModal={showAddNewBunny}
        setShowModal={setShowAddNewBunny}
        bunnyToAdd={bunnyToAdd}
        setBunnyToAdd={setBunnyToAdd}
        onSave={isEditing ? editBunny : addBunny}
        onCancel={resetBunnyForm}
        isEditing={isEditing}
        editingBunnyIndex={editingBunny}
      />
      <Button onClick={onNext}>Next</Button>
    </div>
  );
};
