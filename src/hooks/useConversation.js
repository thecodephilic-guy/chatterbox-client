import { useEffect, useState, useCallback } from "react";
import apiService from "../../services/api.js";

export default function useConversation(chatId) {
  
  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);

  const loadMessages = useCallback(async () => {
    if (!chatId || loading) return;

    setLoading(true);
    const messageResponse = await apiService.getMessages(chatId);
    setMessages((prev) => [...messageResponse.data, ...prev]); // prepend for scroll-up behavior
    // setHasMore(hasMore);
    setLoading(false);
  }, [chatId, page]);

  useEffect(() => {
    if (chatId) {
      setMessages([]);
      setPage(1);
      setHasMore(false);
      loadMessages(); // load initial page
    }
  }, [chatId, loadMessages]);

  const loadMore = () => setPage((prev) => prev + 1);

  return { messages, loadMore, hasMore, loading };
}
