import BaseQuery from "./BaseQuery";

// export const GetNoteService = {
//   getNote: async (id) => {
//     const response = await fetch(`${BaseQuery.baseUrl}/notes/${id}`, {
//       method: "GET",
//       headers: BaseQuery.prepareHeaders(new Headers()),
//     });

//     if (!response.ok) {
//       throw new Error(
//         `Error fetching note with id ${id}: ${response.statusText}`
//       );
//     }

//     return response.json();
//   },
// };

// export const GetArchivedNotesService = {
//   getArchivedNotes: async () => {
//     const response = await fetch(`${BaseQuery.baseUrl}/notes/archived`, {
//       method: "GET",
//       headers: BaseQuery.prepareHeaders(new Headers()),
//     });

//     if (!response.ok) {
//       throw new Error(`Error fetching archived notes: ${response.statusText}`);
//     }

//     return response.json();
//   },
// };

// export const CreateNoteService = {
//   createNote: async (note) => {
//     const response = await fetch(`${BaseQuery.baseUrl}/notes`, {
//       method: "POST",
//       headers: BaseQuery.prepareHeaders(new Headers()),
//       body: JSON.stringify(note),
//     });

//     if (!response.ok) {
//       throw new Error(`Error creating note: ${response.statusText}`);
//     }

//     return response.json();
//   },
// };

// export const ArchiveNoteService = {
//   archiveNote: async (id) => {
//     const response = await fetch(`${BaseQuery.baseUrl}/notes/${id}/archive`, {
//       method: "POST",
//       headers: BaseQuery.prepareHeaders(new Headers()),
//     });

//     if (!response.ok) {
//       throw new Error(
//         `Error archiving note with id ${id}: ${response.statusText}`
//       );
//     }

//     return response.json();
//   },
// };

// export const UnarchiveNoteService = {
//   unarchiveNote: async (id) => {
//     const response = await fetch(`${BaseQuery.baseUrl}/notes/${id}/unarchive`, {
//       method: "POST",
//       headers: BaseQuery.prepareHeaders(new Headers()),
//     });

//     if (!response.ok) {
//       throw new Error(
//         `Error unarchiving note with id ${id}: ${response.statusText}`
//       );
//     }

//     return response.json();
//   },
// };

// export const DeleteNoteService = {
//   deleteNote: async (id) => {
//     const response = await fetch(`${BaseQuery.baseUrl}/notes/${id}`, {
//       method: "DELETE",
//       headers: BaseQuery.prepareHeaders(new Headers()),
//     });

//     if (!response.ok) {
//       throw new Error(
//         `Error deleting note with id ${id}: ${response.statusText}`
//       );
//     }

//     return response.json();
//   },
// };

export const NoteService = {
  getNote: async (id) => {
    const Url = id
      ? `${BaseQuery.baseUrl}/notes/${id}`
      : `${BaseQuery.baseUrl}/notes`;
    const response = await fetch(`${Url}`, {
      method: "GET",
      headers: BaseQuery.prepareHeaders(new Headers()),
    });

    if (!response.ok) {
      throw new Error(
        `Error fetching note with id ${id}: ${response.statusText}`,
      );
    }

    return response.json();
  },
  getArchivedNotes: async () => {
    const response = await fetch(`${BaseQuery.baseUrl}/notes/archived`, {
      method: "GET",
      headers: BaseQuery.prepareHeaders(new Headers()),
    });

    if (!response.ok) {
      throw new Error(`Error fetching archived notes: ${response.statusText}`);
    }

    return response.json();
  },
  createNote: async (note) => {
    const response = await fetch(`${BaseQuery.baseUrl}/notes`, {
      method: "POST",
      headers: BaseQuery.prepareHeaders(new Headers()),
      body: JSON.stringify(note),
    });

    if (!response.ok) {
      throw new Error(`Error creating note: ${response.statusText}`);
    }

    return response.json();
  },
  archiveNote: async (id) => {
    const response = await fetch(`${BaseQuery.baseUrl}/notes/${id}/archive`, {
      method: "POST",
      headers: BaseQuery.prepareHeaders(new Headers()),
    });

    if (!response.ok) {
      throw new Error(
        `Error archiving note with id ${id}: ${response.statusText}`,
      );
    }

    return response.json();
  },
  unarchiveNote: async (id) => {
    const response = await fetch(`${BaseQuery.baseUrl}/notes/${id}/unarchive`, {
      method: "POST",
      headers: BaseQuery.prepareHeaders(new Headers()),
    });

    if (!response.ok) {
      throw new Error(
        `Error unarchiving note with id ${id}: ${response.statusText}`,
      );
    }

    return response.json();
  },
  deleteNote: async (id) => {
    const response = await fetch(`${BaseQuery.baseUrl}/notes/${id}`, {
      method: "DELETE",
      headers: BaseQuery.prepareHeaders(new Headers()),
    });

    if (!response.ok) {
      throw new Error(
        `Error deleting note with id ${id}: ${response.statusText}`,
      );
    }

    return response.json();
  },
};
