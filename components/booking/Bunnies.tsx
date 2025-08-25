"use client";

import { Bunny } from "@/lib/types";
import { useState } from "react";
import { Button } from "../ui/button";
import { AddNewBunnyModal } from "./AddNewBunnyModal";
import { Check, Mars, Plus, Venus, X } from "lucide-react";
import { Badge } from "../ui/badge";
import Image from "next/image";

export const Bunnies = ({
  bunnies,
  setBunnies,
}: {
  bunnies: Bunny[];
  setBunnies: (bunnies: Bunny[]) => void;
}) => {
  const [showAddNewBunny, setShowAddNewBunny] = useState(false);
  const [bunnyToAdd, setBunnyToAdd] = useState<Bunny>({
    name: "",
    isVaccinated: false,
    isSpayed: false,
    isMale: true,
  });

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
    <div className="flex flex-col gap-6 w-full max-w-[800px] px-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-gray-800 text-center select-none">
          How many bunnies?
        </h1>
        <p className="text-sm text-gray-500 text-center select-none">
          Just looking to get a little more information about the bunnies
          you&apos;re bringing!
        </p>
      </div>

      {/* Display existing bunnies */}
      <div className="space-y-4 mt-8">
        {bunnies.map((bunny, index) => (
          <div key={index} className="">
            <div className="flex items-center justify-between">
              <div className="flex items-start gap-4">
                {/* Display bunny picture or placeholder */}
                {bunny.picture ? (
                  <img
                    src={bunny.picture}
                    alt={`${bunny.name}`}
                    className="size-24 object-cover rounded-lg"
                  />
                ) : (
                  <div className="size-24 bg-gray-200 rounded-lg flex items-center justify-center">
                    <span className="text-gray-400 text-sm">No photo</span>
                  </div>
                )}
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <p className="text-lg font-medium">{bunny.name}</p>
                    {bunny.isMale ? (
                      <Mars className="text-sky-400 size-4" />
                    ) : (
                      <Venus className="text-rose-400 size-4" />
                    )}
                  </div>
                  <div className="flex flex-col justify-center gap-1">
                    <Badge className="flex items-center gap-1 bg-gray-100 text-sm font-normal text-gray-600">
                      <p>
                        {bunny.isVaccinated ? (
                          <Check className="text-green-500 size-4" />
                        ) : (
                          <X className="text-red-500 size-4" />
                        )}
                      </p>
                      <p className="text-sm">Vaccinated</p>
                    </Badge>
                    <Badge className="flex items-center gap-1 bg-gray-100 text-sm font-normal text-gray-600">
                      <p className="text-sm">
                        {bunny.isSpayed ? (
                          <Check className="text-green-500 size-4" />
                        ) : (
                          <X className="text-red-500 size-4" />
                        )}
                      </p>
                      <p className="text-sm">Spayed</p>
                    </Badge>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => startEditing(bunny, index)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  onClick={() => deleteBunny(index)}
                  className="bg-red-400 text-white hover:bg-red-500"
                >
                  Remove
                </Button>
              </div>
            </div>
            <hr className="mt-4" />
          </div>
        ))}
      </div>

      {/* Add New Bunny Form */}
      <div className="flex items-center justify-center gap-2">
        <Button
          onClick={() => setShowAddNewBunny(true)}
          className=" flex flex-row items-center gap-2 bg-sage text-white hover:bg-sage/80 rounded-xl "
          disabled={bunnies.length >= 3}
        >
          <Plus />
          <p>Add a bunny</p>
        </Button>
        <p className="text-xs text-gray-500">
          {bunnies.length >= 3 ? "Limit of 3 bunnies per booking" : ""}
        </p>
      </div>
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
    </div>
  );
};
