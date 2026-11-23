import { useCallback, useEffect, useState } from "react";

const DOG_IMAGE_URL = "https://dog.ceo/api/breeds/image/random";

function App() {
  const [dogImageUrl, setDogImageUrl] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDogImage = useCallback(async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(DOG_IMAGE_URL);
      if (!response.ok) {
        throw new Error("The dog image request failed.");
      }

      const data = await response.json();
      if (typeof data.message !== "string") {
        throw new Error("The dog image response was invalid.");
      }

      setDogImageUrl(data.message);
    } catch {
      setDogImageUrl("");
      setError("Could not load a dog image. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchDogImage();
  }, [fetchDogImage]);

  return (
    <main className="app">
      <section className="dog-card" aria-labelledby="page-title">
        <p className="eyebrow">A little happiness, on demand</p>
        <h1 id="page-title">Random Dog</h1>
        <p className="intro">Meet a new furry friend with every click.</p>

        <div className="image-frame" aria-live="polite">
          {isLoading && <p className="status-message">Loading...</p>}
          {!isLoading && error && (
            <p className="status-message error-message" role="alert">
              {error}
            </p>
          )}
          {!isLoading && dogImageUrl && (
            <img src={dogImageUrl} alt="A Random Dog" />
          )}
        </div>

        <button type="button" onClick={() => void fetchDogImage()} disabled={isLoading}>
          {isLoading ? "Finding a dog..." : "Show me another dog"}
        </button>
      </section>
    </main>
  );
}

export default App;
