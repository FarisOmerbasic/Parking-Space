const API_URL = "http://localhost:5164/api";

export const fetchParkingSpaces = async () => {
    try {
      const response = await fetch(`${API_URL}/parkingSpaces`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
      });
  
      if (!response.ok) {
        throw new Error("Failed to submit data");
      }
  
      return await response.json();
    } catch (error) {
      console.error("Error posting form data:", error);
      throw error;
    }
  };