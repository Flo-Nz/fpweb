import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Spinner } from "@heroui/react";
import { Navigate } from "react-router-dom";
import { getPendingBoardgames, validateBoardgame, deleteBoardgame, updateBoardgame } from "../lib/api";
import { useUser } from "../context/UserContext";
import { canEdit } from "../lib/auth";
import { CheckIcon, TrashIcon, QuestionIcon, EditIcon, AddIcon, SaveIcon } from "../components/icons/Icons";
import RatingBadge from "../components/RatingBadge";

const PendingCard = ({ boardgame }) => {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [titles, setTitles] = useState([...boardgame.title]);

  const id = boardgame._id || boardgame.id;
  const title = boardgame.title?.[0] || "Sans titre";
  const discordRating = boardgame.discordRating;
  const ratingsCount = boardgame.discordOrop?.ratings?.length || 0;

  const invalidate = () => queryClient.invalidateQueries({ queryKey: ["pendingBoardgames"] });

  const validateMutation = useMutation({
    mutationFn: () => validateBoardgame(id),
    onSuccess: invalidate,
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteBoardgame(id),
    onSuccess: invalidate,
  });

  const updateMutation = useMutation({
    mutationFn: (payload) => updateBoardgame(id, payload),
    onSuccess: () => {
      invalidate();
      setIsEditing(false);
    },
  });

  const handleSave = () => {
    const cleanTitles = titles.filter((t) => t.trim() !== "");
    if (cleanTitles.length === 0) return;
    updateMutation.mutate({ title: cleanTitles });
  };

  const handleCancel = () => {
    setTitles([...boardgame.title]);
    setIsEditing(false);
  };

  return (
    <div className="rounded-xl border border-divider bg-content1 p-4">
      {/* Top row: title + actions */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold capitalize text-foreground">
            {title}
          </span>
          <div className="flex items-center gap-2">
            {boardgame.title.length > 1 && (
              <span className="text-xs text-foreground/40">
                +{boardgame.title.length - 1} titre(s) alternatif(s)
              </span>
            )}
            {discordRating && (
              <div className="flex items-center gap-1">
                <RatingBadge rating={discordRating} size="sm" />
                <span className="text-xs text-foreground/40">({ratingsCount})</span>
              </div>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-fp-purple/10 px-3 py-2 text-xs font-medium text-fp-purple transition-colors hover:bg-fp-purple/20"
          >
            <EditIcon size="16" />
            Éditer
          </button>
          <button
            onClick={() => validateMutation.mutate()}
            disabled={validateMutation.isPending}
            className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-fp-green/15 px-3 py-2 text-xs font-medium text-fp-green transition-colors hover:bg-fp-green/25 disabled:opacity-50"
          >
            <CheckIcon size="16" />
            Valider
          </button>
          <button
            onClick={() => {
              if (window.confirm(`Supprimer "${title}" ?`)) {
                deleteMutation.mutate();
              }
            }}
            disabled={deleteMutation.isPending}
            className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-fp-rose/10 px-3 py-2 text-xs font-medium text-fp-rose transition-colors hover:bg-fp-rose/20 disabled:opacity-50"
          >
            <TrashIcon size="16" />
            Supprimer
          </button>
        </div>
      </div>

      {/* Edit panel */}
      {isEditing && (
        <div className="mt-3 border-t border-divider pt-3">
          <div className="flex flex-col gap-2">
            {titles.map((t, index) => (
              <div key={index} className="flex items-center gap-2">
                <input
                  type="text"
                  value={t}
                  onChange={(e) => {
                    const newTitles = [...titles];
                    newTitles[index] = e.target.value;
                    setTitles(newTitles);
                  }}
                  placeholder={index === 0 ? "Titre principal" : "Titre alternatif"}
                  className="flex-1 rounded-lg border border-divider bg-background px-3 py-1.5 text-sm text-foreground placeholder:text-foreground/30 focus:border-fp-purple focus:outline-none"
                />
                {index > 0 && (
                  <button
                    onClick={() => setTitles(titles.filter((_, i) => i !== index))}
                    className="cursor-pointer rounded-lg p-1 text-fp-rose/70 hover:bg-fp-rose/10 hover:text-fp-rose"
                  >
                    <TrashIcon size="16" />
                  </button>
                )}
              </div>
            ))}
          </div>
          <div className="mt-2 flex items-center justify-between">
            <button
              onClick={() => setTitles([...titles, ""])}
              className="flex cursor-pointer items-center gap-1 rounded-lg bg-fp-green/10 px-2 py-1 text-xs text-fp-green hover:bg-fp-green/20"
            >
              <AddIcon size="14" />
              Ajouter
            </button>
            <div className="flex items-center gap-2">
              <button
                onClick={handleCancel}
                className="cursor-pointer rounded-lg px-2 py-1 text-xs text-foreground/50 hover:bg-content2"
              >
                Annuler
              </button>
              <button
                onClick={handleSave}
                disabled={updateMutation.isPending}
                className="flex cursor-pointer items-center gap-1 rounded-lg bg-fp-purple px-3 py-1 text-xs font-medium text-white hover:opacity-90 disabled:opacity-50"
              >
                <SaveIcon size="14" />
                {updateMutation.isPending ? "..." : "Enregistrer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const PendingPage = () => {
  const { user, loading } = useUser();

  const { data: pending, isLoading } = useQuery({
    queryKey: ["pendingBoardgames"],
    queryFn: getPendingBoardgames,
    enabled: !!user.isLogged && canEdit(user.discordRoles),
  });

  if (loading) {
    return (
      <div className="flex justify-center py-20">
        <Spinner size="lg" />
      </div>
    );
  }

  if (!user.isLogged || !canEdit(user.discordRoles)) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-3">
        <QuestionIcon size="40" />
        <div>
          <h1 className="text-2xl font-bold text-foreground">
            Jeux en attente de validation
          </h1>
          {pending && (
            <p className="text-sm text-foreground/50">
              {pending.length} jeu{pending.length > 1 ? "x" : ""} à valider
            </p>
          )}
        </div>
      </div>

      {isLoading && (
        <div className="flex justify-center py-12">
          <Spinner size="lg" />
        </div>
      )}

      {pending && pending.length === 0 && (
        <div className="flex flex-col items-center gap-4 rounded-xl border border-divider bg-content1 py-12">
          <CheckIcon size="64" />
          <p className="text-foreground/50">
            Aucun jeu en attente, tout est validé !
          </p>
        </div>
      )}

      {pending && pending.length > 0 && (
        <div className="flex flex-col gap-3">
          {pending.map((boardgame) => (
            <PendingCard key={boardgame._id || boardgame.id} boardgame={boardgame} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PendingPage;
