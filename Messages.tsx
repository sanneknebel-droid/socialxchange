import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'react-router-dom';
import axios from 'axios';
import { io, Socket } from 'socket.io-client';
import { useAuth } from '../context/AuthContext';
import { format } from 'date-fns';

interface User {
  userId: number;
  name: string;
  email: string;
  userType: string;
  city?: string;
  state?: string;
}

interface Conversation {
  otherUserId: number;
  otherUserName: string;
  otherUserType: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
}

interface Message {
  id: number;
  senderId: number;
  receiverId: number;
  content: string;
  createdAt: string;
  read: number;
  senderName: string;
  receiverName: string;
}

export default function Messages() {
  const { user, token } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<number | null>(
    searchParams.get('userId') ? parseInt(searchParams.get('userId')!) : null
  );
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [socket, setSocket] = useState<Socket | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [showStartConversation, setShowStartConversation] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<User[]>([]);
  const [searchLoading, setSearchLoading] = useState(false);

  useEffect(() => {
    loadConversations();
  }, []);

  useEffect(() => {
    if (selectedConversation) {
      loadMessages(selectedConversation);
    }
  }, [selectedConversation]);

  useEffect(() => {
    if (token && user) {
      const socketUrl = import.meta.env.VITE_SOCKET_URL || 'http://localhost:3000';
      const newSocket = io(socketUrl, {
        auth: { token }
      });

      newSocket.on('new_message', (data: any) => {
        if (data.senderId === selectedConversation || data.receiverId === selectedConversation) {
          setMessages((prev) => [
            ...prev,
            {
              id: Date.now(),
              senderId: data.senderId,
              receiverId: data.receiverId,
              content: data.content,
              createdAt: data.createdAt,
              read: 0,
              senderName: user.id === data.senderId ? user.name : '',
              receiverName: user.id === data.receiverId ? user.name : ''
            }
          ]);
          loadConversations();
        } else {
          loadConversations();
        }
      });

      setSocket(newSocket);

      return () => {
        newSocket.close();
      };
    }
  }, [token, user, selectedConversation]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const loadConversations = async () => {
    try {
      const response = await axios.get('/api/messages/conversations');
      setConversations(response.data);
    } catch (error) {
      console.error('Failed to load conversations:', error);
    }
  };

  const loadMessages = async (otherUserId: number) => {
    try {
      const response = await axios.get(`/api/messages/${otherUserId}`);
      setMessages(response.data);
    } catch (error) {
      console.error('Failed to load messages:', error);
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedConversation) return;

    try {
      const response = await axios.post('/api/messages', {
        receiverId: selectedConversation,
        content: newMessage
      });

      setMessages((prev) => [...prev, response.data]);
      setNewMessage('');
      loadConversations();

      if (socket) {
        socket.emit('send_message', {
          receiverId: selectedConversation,
          content: newMessage
        });
      }
    } catch (error) {
      console.error('Failed to send message:', error);
    }
  };

  const getOtherUserName = (conversation: Conversation) => {
    return conversation.otherUserName;
  };

  const handleSearchUsers = async (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setSearchLoading(true);
    try {
      const response = await axios.get('/api/messages/users/search', {
        params: { query }
      });
      setSearchResults(response.data);
    } catch (error) {
      console.error('Failed to search users:', error);
      setSearchResults([]);
    } finally {
      setSearchLoading(false);
    }
  };

  const startConversation = (userId: number) => {
    setSelectedConversation(userId);
    setSearchParams({ userId: userId.toString() });
    setShowStartConversation(false);
    setSearchQuery('');
    setSearchResults([]);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Messages</h1>

      <div className="bg-white rounded-lg shadow-md border border-gray-200 flex" style={{ height: '600px' }}>
        {/* Conversations List */}
        <div className="w-1/3 border-r border-gray-200 overflow-y-auto relative">
          <div className="p-4 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-gray-900">Conversations</h2>
              <button
                onClick={() => setShowStartConversation(true)}
                className="px-3 py-1.5 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Start Conversation
              </button>
            </div>
          </div>

          {/* Start Conversation Modal */}
          {showStartConversation && (
            <div className="absolute inset-0 bg-white z-10 flex flex-col">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="font-semibold text-gray-900">Start New Conversation</h3>
                <button
                  onClick={() => {
                    setShowStartConversation(false);
                    setSearchQuery('');
                    setSearchResults([]);
                  }}
                  className="text-gray-500 hover:text-gray-700"
                >
                  ✕
                </button>
              </div>
              <div className="p-4 border-b border-gray-200">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => handleSearchUsers(e.target.value)}
                  placeholder="Search by name or email..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  autoFocus
                />
              </div>
              <div className="flex-1 overflow-y-auto">
                {searchLoading && (
                  <div className="p-4 text-center text-gray-500">Searching...</div>
                )}
                {!searchLoading && searchQuery && searchResults.length === 0 && (
                  <div className="p-4 text-center text-gray-500">No users found</div>
                )}
                {!searchLoading && !searchQuery && (
                  <div className="p-4 text-center text-gray-500">
                    Type a name or email to search for users
                  </div>
                )}
                {!searchLoading && searchResults.length > 0 && (
                  <div>
                    {searchResults.map((user) => (
                      <button
                        key={user.userId}
                        onClick={() => startConversation(user.userId)}
                        className="w-full p-4 text-left border-b border-gray-200 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{user.name}</h4>
                            <p className="text-sm text-gray-600">{user.email}</p>
                            <p className="text-xs text-gray-400 mt-1 capitalize">
                              {user.userType.replace('_', ' ')}
                              {(user.city || user.state) && 
                                ` • ${[user.city, user.state].filter(Boolean).join(', ')}`
                              }
                            </p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
          {conversations.length === 0 ? (
            <div className="p-4 text-center text-gray-500">
              No conversations yet. Start by searching for influencers!
            </div>
          ) : (
            <div>
              {conversations.map((conversation) => (
                <button
                  key={conversation.otherUserId}
                  onClick={() => {
                    setSelectedConversation(conversation.otherUserId);
                    setSearchParams({ userId: conversation.otherUserId.toString() });
                  }}
                  className={`w-full p-4 text-left border-b border-gray-200 hover:bg-gray-50 transition-colors ${
                    selectedConversation === conversation.otherUserId ? 'bg-indigo-50' : ''
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">
                        {getOtherUserName(conversation)}
                      </h3>
                      <p className="text-sm text-gray-600 mt-1 truncate">
                        {conversation.lastMessage}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        {conversation.lastMessageTime
                          ? format(new Date(conversation.lastMessageTime), 'MMM d, h:mm a')
                          : ''}
                      </p>
                    </div>
                    {conversation.unreadCount > 0 && (
                      <span className="ml-2 bg-indigo-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
                        {conversation.unreadCount}
                      </span>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Messages Area */}
        <div className="flex-1 flex flex-col">
          {selectedConversation ? (
            <>
              <div className="p-4 border-b border-gray-200">
                <h2 className="font-semibold text-gray-900">
                  {conversations.find((c) => c.otherUserId === selectedConversation)?.otherUserName ||
                    'Loading...'}
                </h2>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => {
                  const isOwn = message.senderId === user?.id;
                  return (
                    <div
                      key={message.id}
                      className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                          isOwn
                            ? 'bg-indigo-600 text-white'
                            : 'bg-gray-200 text-gray-900'
                        }`}
                      >
                        <p>{message.content}</p>
                        <p
                          className={`text-xs mt-1 ${
                            isOwn ? 'text-indigo-100' : 'text-gray-500'
                          }`}
                        >
                          {format(new Date(message.createdAt), 'h:mm a')}
                        </p>
                      </div>
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              <form onSubmit={sendMessage} className="p-4 border-t border-gray-200">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type a message..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                  />
                  <button
                    type="submit"
                    className="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Send
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-500">
              Select a conversation to start messaging
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

