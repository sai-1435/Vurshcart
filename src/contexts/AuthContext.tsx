import React, {
createContext,
useContext,
useEffect,
useState,
} from "react";

interface User {
id: number;
name: string;
email: string;
role?: string;
}

interface AuthContextType {
user: User | null;
loading: boolean;
isSeller: boolean;

signIn: (
email: string,
password: string
) => Promise<void>;

signUp: (
email: string,
password: string,
fullName: string,
asSeller?: boolean
) => Promise<void>;

signOut: () => Promise<void>;

signInWithGoogle: () => Promise<void>;
signInWithApple: () => Promise<void>;
signInWithPhone: (phone: string) => Promise<void>;
verifyPhoneOtp: (
phone: string,
token: string
) => Promise<void>;

becomeSeller: (
storeName: string
) => Promise<void>;

refreshRoles: () => Promise<void>;
}

const AuthContext =
createContext<AuthContextType | undefined>(
undefined
);

export const AuthProvider: React.FC<{
children: React.ReactNode;
}> = ({ children }) => {

const [user, setUser] =
useState<User | null>(null);

const [loading, setLoading] =
useState(true);

const [isSeller, setIsSeller] =
useState(false);

useEffect(() => {


const storedUser =
  localStorage.getItem("user");

if (storedUser) {

  const userData =
    JSON.parse(storedUser);

  setUser(userData);

  if (
    userData.role === "seller"
  ) {
    setIsSeller(true);
  }
}

setLoading(false);

}, []);

const signIn = async (
email: string,
password: string
) => {


const response =
  await fetch(
    "http://127.0.0.1:5000/login",
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }
  );

const data =
  await response.json();

if (!data.success) {
  throw new Error(
    data.message
  );
}

localStorage.setItem(
  "user",
  JSON.stringify(data.user)
);

setUser(data.user);

};

const signUp = async (
email: string,
password: string,
fullName: string,
asSeller = false
) => {


const response =
  await fetch(
    "http://127.0.0.1:5000/register",
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        full_name: fullName,
        email,
        password,
        role: asSeller
          ? "seller"
          : "user",
      }),
    }
  );

const data =
  await response.json();

if (!data.success) {
  throw new Error(
    data.message
  );
}

};

const signOut = async () => {


localStorage.removeItem(
  "user"
);

setUser(null);

setIsSeller(false);


};

const signInWithGoogle =
async () => {
alert(
"Google Login not configured"
);
};

const signInWithApple =
async () => {
alert(
"Apple Login not configured"
);
};

const signInWithPhone =
async () => {
alert(
"Phone Login not configured"
);
};

const verifyPhoneOtp =
async () => {
alert(
"Phone OTP not configured"
);
};

const becomeSeller =
async () => {
alert(
"Seller API not configured"
);
};

const refreshRoles =
async () => {};

return (
<AuthContext.Provider
value={{
user,
loading,
isSeller,
signIn,
signUp,
signOut,
signInWithGoogle,
signInWithApple,
signInWithPhone,
verifyPhoneOtp,
becomeSeller,
refreshRoles,
}}
>
{children}
</AuthContext.Provider>
);
};

export const useAuth = () => {

const ctx =
useContext(AuthContext);

if (!ctx) {
throw new Error(
"useAuth must be inside AuthProvider"
);
}

return ctx;
};
