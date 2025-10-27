"use client";

import { Bunny } from "@/lib/types";
import { useState } from "react";
import { Button } from "../ui/button";
import { AddNewBunnyModal } from "./AddNewBunnyModal";
import { Check, Mars, Plus, Venus, X } from "lucide-react";
import { Badge } from "../ui/badge";
import { Card } from "../ui/card";
import { CardContent, CardHeader, CardTitle } from "../ui/card";

interface KennelConfiguration {
  id: number;
  bunnies: number[]; // Array of bunny indices
}

interface BunniesAndKennelsProps {
  bunnies: Bunny[];
  setBunnies: (bunnies: Bunny[]) => void;
  kennels: KennelConfiguration[];
  setKennels: (kennels: KennelConfiguration[]) => void;
}

export const BunniesAndKennels = ({
  bunnies,
  setBunnies,
  kennels,
  setKennels,
}: BunniesAndKennelsProps) => {
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
    const newBunnies = [...bunnies, bunny];
    setBunnies(newBunnies);
    // Don't auto-assign to any kennel - let user choose
    
    // Reset the form
    setBunnyToAdd({
      name: "",
      isVaccinated: false,
      isSpayed: false,
      isMale: true,
    });
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
    // Remove bunny from all kennels
    const updatedKennels = kennels.map((kennel) => ({
      ...kennel,
      bunnies: kennel.bunnies.filter((bi) => bi !== index),
    })).filter((kennel) => kennel.bunnies.length > 0)
    .map((kennel) => ({
      ...kennel,
      bunnies: kennel.bunnies.map((bi) => 
        bi > index ? bi - 1 : bi
      ),
    }));

    setKennels(updatedKennels.length > 0 ? updatedKennels : [{ id: 1, bunnies: [] }]);
    
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

  const moveBunnyToKennel = (bunnyIndex: number, targetKennelId: number) => {
    const updatedKennels = [...kennels];
    
    // Remove bunny from any existing kennel
    for (const k of updatedKennels) {
      if (k.bunnies.includes(bunnyIndex)) {
        k.bunnies = k.bunnies.filter((bi: number) => bi !== bunnyIndex);
      }
    }
    
    // Add to target kennel if it's not full
    const targetKennel = updatedKennels.find((k) => k.id === targetKennelId);
    if (targetKennel && targetKennel.bunnies.length < 3) {
      targetKennel.bunnies.push(bunnyIndex);
    }
    
    setKennels(updatedKennels);
  };

  const removeBunnyFromKennel = (bunnyIndex: number) => {
    const updatedKennels = [...kennels];
    
    for (const k of updatedKennels) {
      if (k.bunnies.includes(bunnyIndex)) {
        k.bunnies = k.bunnies.filter((bi: number) => bi !== bunnyIndex);
      }
    }
    
    // If removing bunny leaves empty kennels, keep at least one empty kennel
    const nonEmptyKennels = updatedKennels.filter((k) => k.bunnies.length > 0);
    setKennels(nonEmptyKennels.length > 0 ? nonEmptyKennels : [{ id: 1, bunnies: [] }]);
  };

  const getUnassignedBunnies = () => {
    const assignedIndices = new Set(kennels.flatMap((k) => k.bunnies));
    return bunnies
      .map((bunny, index) => ({ bunny, index }))
      .filter(({ index }) => !assignedIndices.has(index));
  };

  const addKennel = () => {
    // Don't allow more than 3 kennels
    if (kennels.length >= 3) return;
    
    const newKennel: KennelConfiguration = {
      id: kennels.length > 0 ? Math.max(...kennels.map((k) => k.id)) + 1 : 1,
      bunnies: [],
    };
    setKennels([...kennels, newKennel]);
  };

  const removeKennel = (kennelId: number) => {
    if (kennels.length <= 1) return;
    
    const kennelToRemove = kennels.find((k) => k.id === kennelId);
    const updatedKennels = kennels.filter((k) => k.id !== kennelId);
    
    // Redistribute bunnies to existing kennels
    if (kennelToRemove) {
      kennelToRemove.bunnies.forEach((bunnyIndex) => {
        const targetKennel = updatedKennels.find((k) => k.bunnies.length < 3) || updatedKennels[0];
        if (targetKennel) {
          targetKennel.bunnies.push(bunnyIndex);
        }
      });
    }
    
    setKennels(updatedKennels.length > 0 ? updatedKennels : [{ id: 1, bunnies: [] }]);
  };

  const getKennelPrice = (bunnyCount: number) => {
    if (bunnyCount === 1) return 30;
    if (bunnyCount === 2) return 45;
    if (bunnyCount === 3) return 55;
    return 0;
  };

  const getTotalPrice = () => {
    return kennels.reduce((total, kennel) => {
      return total + getKennelPrice(kennel.bunnies.length);
    }, 0);
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-[1000px] px-4">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-gray-800 text-center select-none">
          Configure Your Bunnies & Kennels
        </h1>
        <p className="text-sm text-gray-500 text-center select-none">
          Add your bunnies and organize them into kennels. Max 5 bunnies total, max 3 per kennel.
        </p>
      </div>

      {/* Total Price Display */}
      <div className="bg-gradient-to-br from-sage/10 to-sage/5 border-2 border-sage/30 rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-gray-600 uppercase tracking-wide font-medium">
              Total Daily Rate
            </p>
            <p className="text-3xl font-bold text-sage mt-1">
              ${getTotalPrice()}/day
            </p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">
              {bunnies.length} {bunnies.length === 1 ? "bunny" : "bunnies"}
            </p>
            <p className="text-sm text-gray-600">
              in {kennels.length} {kennels.length === 1 ? "kennel" : "kennels"}
            </p>
          </div>
        </div>
        
        {/* Breakdown by Kennel */}
        {kennels.some(k => k.bunnies.length > 0) && (
          <div className="border-t border-sage/30 pt-4">
            <p className="text-xs font-semibold text-gray-600 uppercase tracking-wide mb-2">
              Daily Cost Breakdown
            </p>
            <div className="space-y-2">
              {kennels.map((kennel, index) => {
                if (kennel.bunnies.length === 0) return null;
                return (
                  <div key={kennel.id} className="flex items-center justify-between text-sm">
                    <span className="text-gray-700">
                      Kennel {index + 1} ({kennel.bunnies.length} {kennel.bunnies.length === 1 ? "bunny" : "bunnies"})
                    </span>
                    <span className="font-semibold text-sage">
                      ${getKennelPrice(kennel.bunnies.length)}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* List of All Bunnies */}
      {bunnies.length > 0 && (
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-semibold text-warm-brown mb-4">Your Bunnies</h3>
          <div className="space-y-3">
            {bunnies.map((bunny, bunnyIndex) => {
              const assignedKennel = kennels.find((k) => k.bunnies.includes(bunnyIndex));
              const isAssigned = !!assignedKennel;
              
              return (
                <div key={bunnyIndex} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="flex items-center gap-3 flex-1">
                    {bunny.picture ? (
                      <img
                        src={bunny.picture}
                        alt={bunny.name}
                        className="size-16 object-cover rounded-lg"
                      />
                    ) : (
                      <div className="size-16 bg-gray-200 rounded-lg flex items-center justify-center">
                        <span className="text-gray-400 text-xs">No photo</span>
                      </div>
                    )}
                    <div className="flex flex-col flex-1">
                      <div className="flex items-center gap-2">
                        <p className="font-medium text-lg">{bunny.name}</p>
                        {bunny.isMale ? (
                          <Mars className="text-sky-400 size-4" />
                        ) : (
                          <Venus className="text-rose-400 size-4" />
                        )}
                        {isAssigned && (
                          <Badge className="text-xs bg-green-100 text-green-700">
                            Assigned to Kennel {kennels.findIndex((k) => k.id === assignedKennel.id) + 1}
                          </Badge>
                        )}
                      </div>
                      <div className="flex gap-2 mt-1">
                        <Badge className="text-xs bg-gray-100">
                          {bunny.isVaccinated ? "✓ Vaccinated" : "✗ Not Vaccinated"}
                        </Badge>
                        <Badge className="text-xs bg-gray-100">
                          {bunny.isSpayed ? "✓ Spayed" : "✗ Not Spayed"}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {isAssigned ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeBunnyFromKennel(bunnyIndex)}
                          className="text-destructive hover:text-destructive"
                        >
                          Remove from Kennel
                        </Button>
                      ) : (
                        <select
                          className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                          onChange={(e) => {
                            if (e.target.value) {
                              moveBunnyToKennel(bunnyIndex, parseInt(e.target.value));
                              e.target.value = "";
                            }
                          }}
                          value=""
                        >
                          <option value="">Assign to kennel...</option>
                          {kennels.map((kennel, kennelIndex) => (
                            <option 
                              key={kennel.id} 
                              value={kennel.id}
                              disabled={kennel.bunnies.length >= 3}
                            >
                              Kennel {kennelIndex + 1} {kennel.bunnies.length >= 3 ? "(Full)" : ""}
                            </option>
                          ))}
                        </select>
                      )}
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => startEditing(bunny, bunnyIndex)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => deleteBunny(bunnyIndex)}
                        className="bg-red-400 text-white hover:bg-red-500"
                      >
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Kennel Configurations */}
      <div className="space-y-4">
        {kennels.map((kennel, kennelIndex) => (
          <Card key={kennel.id} className="border-2">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-xl text-warm-brown">
                  Kennel {kennelIndex + 1}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">
                    {kennel.bunnies.length} {kennel.bunnies.length === 1 ? "bunny" : "bunnies"}
                  </span>
                  <span className="text-lg font-bold text-sage">
                    ${getKennelPrice(kennel.bunnies.length)}/day
                  </span>
                  {kennels.length > 1 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeKennel(kennel.id)}
                      className="h-6 px-2 text-destructive hover:text-destructive"
                    >
                      Remove
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {kennel.bunnies.length === 0 ? (
                <p className="text-sm text-gray-500 text-center py-4 bg-gray-50 rounded-lg">
                  Empty kennel - Assign bunnies from the list above
                </p>
              ) : (
                <div className="space-y-3">
                  {kennel.bunnies.map((bunnyIndex) => {
                    const bunny = bunnies[bunnyIndex];
                    if (!bunny) return null;
                    
                    return (
                      <div key={bunnyIndex} className="flex items-center justify-between p-3 bg-sage/5 rounded-lg border border-sage/20">
                        <div className="flex items-center gap-3">
                          {bunny.picture ? (
                            <img
                              src={bunny.picture}
                              alt={bunny.name}
                              className="size-12 object-cover rounded-lg"
                            />
                          ) : (
                            <div className="size-12 bg-gray-200 rounded-lg flex items-center justify-center">
                              <span className="text-gray-400 text-xs">No photo</span>
                            </div>
                          )}
                          <div>
                            <div className="flex items-center gap-2">
                              <p className="font-medium">{bunny.name}</p>
                              {bunny.isMale ? (
                                <Mars className="text-sky-400 size-3" />
                              ) : (
                                <Venus className="text-rose-400 size-3" />
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </CardContent>
          </Card>
        ))}

      </div>

      {/* Action Buttons Section */}
      <div className="border-t pt-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Button
            onClick={() => setShowAddNewBunny(true)}
            className="flex flex-row items-center justify-center gap-2 bg-sage text-white hover:bg-sage/80 py-6"
            disabled={bunnies.length >= 5}
          >
            <Plus className="size-5" />
            <div className="flex flex-col items-start">
              <p className="font-semibold">Add a Bunny</p>
              <p className="text-xs opacity-90">
                {bunnies.length >= 5 ? "Limit reached" : `${bunnies.length}/5 added`}
              </p>
            </div>
          </Button>
          
          <Button
            variant="outline"
            onClick={addKennel}
            disabled={kennels.length >= 3}
            className="flex flex-row items-center justify-center gap-2 py-6 border-2 border-dashed"
          >
            <Plus className="size-5" />
            <div className="flex flex-col items-start">
              <p className="font-semibold">Add a Kennel</p>
              <p className="text-xs text-muted-foreground">
                {kennels.length >= 3 ? "Limit reached" : `${kennels.length}/3 kennels`}
              </p>
            </div>
          </Button>
        </div>
        
        {(bunnies.length >= 5 || kennels.length >= 3) && (
          <p className="text-xs text-center text-gray-500">
            {bunnies.length >= 5 && "You've reached the maximum number of bunnies. "}
            {kennels.length >= 3 && "You've reached the maximum number of kennels."}
          </p>
        )}
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

