export const supabase = {
auth: {
getUser: async () => ({
data: { user: null },
error: null,
}),

getSession: async () => ({
  data: { session: null },
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

signUp: async () => ({
  data: { user: null },
  error: null,
}),

signInWithPassword: async () => ({
  data: null,
  error: null,
}),

signInWithOtp: async () => ({
  data: null,
  error: null,
}),

verifyOtp: async () => ({
  data: null,
  error: null,
}),

signOut: async () => ({
  error: null,
}),

},

from: () => ({
select: () => ({
eq: () => ({
maybeSingle: async () => ({
data: null,
error: null,
}),
}),
}),

insert: async () => ({
  data: [],
  error: null,
}),

update: async () => ({
  data: [],
  error: null,
}),

delete: async () => ({
  data: [],
  error: null,
}),

}),
};
