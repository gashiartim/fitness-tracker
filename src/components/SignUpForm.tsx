import React, { useState } from "react";
import { signUp } from "../lib/supabase-client";

const SignUpForm: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data, error } = await signUp(email, password);
    if (error) {
      console.error("Error signing up:", error.message);
    } else {
      console.log("Signed up successfully:", data);
      // Handle successful sign-up (e.g., redirect to login page)
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      <button type="submit">Sign Up</button>
    </form>
  );
};

export default SignUpForm;
