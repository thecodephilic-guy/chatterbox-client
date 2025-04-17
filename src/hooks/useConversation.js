import { useEffect, useState, useCallback } from "react";
import apiService from "../../services/api.js";

export default function useConversation(activeUserId) {
  
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadMessages = useCallback(async () => {
    if (!activeUserId || loading) return;

    setLoading(true);
    const { data, hasMore } = await apiService.fetchConversation(
      activeUserId,
      page
    );

    setMessages((prev) => [...data.reverse(), ...prev]); // prepend for scroll-up behavior
    setHasMore(hasMore);
    setLoading(false);
  }, [activeUserId, page]);

  useEffect(() => {
    if (activeUserId) {
      setMessages([]);
      setPage(1);
      setHasMore(false);
      loadMessages(); // load initial page
    }
  }, [activeUserId, loadMessages]);

  const loadMore = () => setPage((prev) => prev + 1);

  return { messages, loadMore, hasMore, loading };
}
