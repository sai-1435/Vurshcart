export const supabase = {
  auth: {
    getUser: async () => ({
      data: { user: null },
      error: null,
    }),

    getSession: async () => ({
      data: {
        session: null,
      },
      error: null,
    }),

    onAuthStateChange: (callback: any) => {
      callback("SIGNED_OUT", null);

      return {
        data: {
          subscription: {
            unsubscribe: () => {},
          },
        },
      };
    },
  },

  from: () => ({
    select: async () => ({ data: [], error: null }),
    insert: async () => ({ data: [], error: null }),
    update: async () => ({ data: [], error: null }),
    delete: async () => ({ data: [], error: null }),
  }),
};