import { useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { updateBoardgame, deleteBoardgame } from "../lib/api";
import { EditIcon, AddIcon, TrashIcon, SaveIcon } from "./icons/Icons";

const ScribePanel = ({ boardgame }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [isEditingCover, setIsEditingCover] = useState(false);
  const [titles, setTitles] = useState([]);
  const [coverUrl, setCoverUrl] = useState("");

  const id = boardgame._id || boardgame.id;

  useEffect(() => {
    if (boardgame?.title) {
      setTitles([...boardgame.title]);
    }
    setCoverUrl(boardgame?.coverUrl || "");
  }, [boardgame]);

  const mutation = useMutation({
    mutationFn: (payload) => updateBoardgame(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["boardgame", id] });
      setIsEditing(false);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => deleteBoardgame(id),
    onSuccess: () => {
      navigate("/");
    },
  });

  const handleDelete = () => {
    if (window.confirm(`Supprimer définitivement "${boardgame.title[0]}" ?`)) {
      deleteMutation.mutate();
    }
  };

  const handleTitleChange = (index, value) => {
    const newTitles = [...titles];
    newTitles[index] = value;
    setTitles(newTitles);
  };

  const addTitle = () => {
    setTitles([...titles, ""]);
  };

  const removeTitle = (index) => {
    if (titles.length <= 1) return; // Keep at least one title
    setTitles(titles.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    const cleanTitles = titles.filter((t) => t.trim() !== "");
    if (cleanTitles.length === 0) return;
    mutation.mutate({ title: cleanTitles });
  };

  const handleCancel = () => {
    setTitles([...boardgame.title]);
    setIsEditing(false);
  };

  const handleSaveCover = () => {
    mutation.mutate({ coverUrl: coverUrl || null, thumbnailUrl: coverUrl || null });
    setIsEditingCover(false);
  };

  if (!isEditing) {
    return (
      <div className="rounded-xl border border-dashed border-fp-purple/30 bg-fp-purple/5 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <EditIcon size="20" />
            <span className="text-xs font-medium uppercase text-fp-purple/70">
              Zone Scribe
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="cursor-pointer rounded-lg bg-fp-purple/10 px-3 py-1.5 text-xs font-medium text-fp-purple transition-colors hover:bg-fp-purple/20"
            >
              Modifier les titres
            </button>
            <button
              onClick={() => setIsEditingCover(!isEditingCover)}
              className="cursor-pointer rounded-lg bg-fp-purple/10 px-3 py-1.5 text-xs font-medium text-fp-purple transition-colors hover:bg-fp-purple/20"
            >
              Modifier la cover
            </button>
            <button
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
              className="flex cursor-pointer items-center gap-1 rounded-lg bg-fp-rose/10 px-3 py-1.5 text-xs font-medium text-fp-rose transition-colors hover:bg-fp-rose/20 disabled:opacity-50"
            >
              <TrashIcon size="14" />
              Supprimer
            </button>
          </div>
        </div>
        {/* Cover URL editor */}
        {isEditingCover && (
          <div className="mt-3 flex items-center gap-2 border-t border-divider pt-3">
            <input
              type="text"
              value={coverUrl}
              onChange={(e) => setCoverUrl(e.target.value)}
              placeholder="URL de la couverture"
              className="flex-1 rounded-lg border border-divider bg-background px-3 py-1.5 text-xs text-foreground placeholder:text-foreground/30 focus:border-fp-purple focus:outline-none"
            />
            <button
              onClick={handleSaveCover}
              disabled={mutation.isPending}
              className="flex cursor-pointer items-center gap-1 rounded-lg bg-fp-purple px-3 py-1.5 text-xs font-medium text-white hover:opacity-90 disabled:opacity-50"
            >
              <SaveIcon size="14" />
              OK
            </button>
          </div>
        )}
        <div className="mt-2 flex flex-wrap gap-1.5">
          {boardgame.title.map((t, i) => (
            <span
              key={i}
              className="rounded-md bg-content2 px-2 py-0.5 text-xs text-foreground/70"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-fp-purple/40 bg-fp-purple/5 p-4">
      <div className="mb-3 flex items-center gap-2">
        <EditIcon size="20" />
        <span className="text-xs font-medium uppercase text-fp-purple/70">
          Édition des titres
        </span>
      </div>

      <div className="flex flex-col gap-2">
        {titles.map((title, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(index, e.target.value)}
              placeholder={index === 0 ? "Titre principal" : "Titre alternatif"}
              className="flex-1 rounded-lg border border-divider bg-content1 px-3 py-2 text-sm text-foreground placeholder:text-foreground/30 focus:border-fp-purple focus:outline-none"
            />
            {index > 0 && (
              <button
                onClick={() => removeTitle(index)}
                className="cursor-pointer rounded-lg p-1.5 text-fp-rose/70 transition-colors hover:bg-fp-rose/10 hover:text-fp-rose"
                title="Supprimer ce titre"
              >
                <TrashIcon size="18" />
              </button>
            )}
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between">
        <button
          onClick={addTitle}
          className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-fp-green/10 px-3 py-1.5 text-xs font-medium text-fp-green transition-colors hover:bg-fp-green/20"
        >
          <AddIcon size="16" />
          Ajouter un titre
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCancel}
            className="cursor-pointer rounded-lg px-3 py-1.5 text-xs font-medium text-foreground/50 transition-colors hover:bg-content2"
          >
            Annuler
          </button>
          <button
            onClick={handleSave}
            disabled={mutation.isPending}
            className="flex cursor-pointer items-center gap-1.5 rounded-lg bg-fp-purple px-3 py-1.5 text-xs font-medium text-white transition-colors hover:opacity-90 disabled:opacity-50"
          >
            <SaveIcon size="16" />
            {mutation.isPending ? "..." : "Enregistrer"}
          </button>
        </div>
      </div>

      {mutation.isError && (
        <p className="mt-2 text-xs text-fp-rose">
          Erreur lors de la sauvegarde. Réessayez.
        </p>
      )}
    </div>
  );
};

export default ScribePanel;
