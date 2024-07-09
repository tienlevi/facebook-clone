import { useState } from "react";

function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState<boolean>(false);

  return { user, setUser };
}

export default useAuth;
