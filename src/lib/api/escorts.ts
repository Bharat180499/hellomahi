import { apiClient } from './client';
import type { Escort, EscortSearchParams, EscortSearchResponse, CreateEscortData, UpdateEscortData, EscortStats, Photo } from '@/types/escort';

// Escort API functions
export const escorts = {
  // Get all escorts with filters
  async getAll(params?: EscortSearchParams): Promise<EscortSearchResponse> {
    const queryParams = new URLSearchParams();
    
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          if (Array.isArray(value)) {
            value.forEach(v => queryParams.append(key, v));
          } else {
            queryParams.append(key, String(value));
          }
        }
      });
    }

    const response = await apiClient.request<EscortSearchResponse>(
      `/api/v1/escorts?${queryParams.toString()}`
    );
    return response.data || { escorts: [], total: 0, page: 1, limit: 10, total_pages: 0, filters: {} };
  },

  // Get escort by ID
  async getById(id: string): Promise<Escort | null> {
    const response = await apiClient.request<Escort>(`/api/v1/escorts/${id}`);
    return response.data || null;
  },

  // Create new escort profile
  async create(data: CreateEscortData): Promise<Escort> {
    const response = await apiClient.request<Escort>('/api/v1/escorts', {
      method: 'POST',
      body: JSON.stringify(data),
    });
    return response.data!;
  },

  // Update escort profile
  async update(id: string, data: UpdateEscortData): Promise<Escort> {
    const response = await apiClient.request<Escort>(`/api/v1/escorts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
    return response.data!;
  },

  // Delete escort profile
  async delete(id: string): Promise<boolean> {
    const response = await apiClient.request(`/api/v1/escorts/${id}`, {
      method: 'DELETE',
    });
    return response.success;
  },

  // Upload escort photos
  async uploadPhotos(id: string, files: File[]): Promise<Photo[]> {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append('photos', file);
    });

    const response = await apiClient.request<Photo[]>(`/api/v1/escorts/${id}/photos`, {
      method: 'POST',
      body: formData,
      headers: {}, // Let browser set Content-Type for FormData
    });
    return response.data || [];
  },

  // Delete escort photo
  async deletePhoto(id: string, photoId: string): Promise<boolean> {
    const response = await apiClient.request(`/api/v1/escorts/${id}/photos/${photoId}`, {
      method: 'DELETE',
    });
    return response.success;
  },

  // Upload escort videos
  async uploadVideos(id: string, files: File[]): Promise<Video[]> {
    const formData = new FormData();
    files.forEach((file, index) => {
      formData.append('videos', file);
    });

    const response = await apiClient.request<Video[]>(`/api/v1/escorts/${id}/videos`, {
      method: 'POST',
      body: formData,
      headers: {}, // Let browser set Content-Type for FormData
    });
    return response.data || [];
  },

  // Delete escort video
  async deleteVideo(id: string, videoId: string): Promise<boolean> {
    const response = await apiClient.request(`/api/v1/escorts/${id}/videos/${videoId}`, {
      method: 'DELETE',
    });
    return response.success;
  },

  // Get escort statistics
  async getStats(): Promise<EscortStats> {
    const response = await apiClient.request<EscortStats>('/api/v1/escorts/stats');
    return response.data || {
      total_escorts: 0,
      active_escorts: 0,
      verified_escorts: 0,
      featured_escorts: 0,
      total_views: 0,
      total_bookings: 0,
      average_rating: 0,
    };
  },

  // Get featured escorts
  async getFeatured(limit: number = 10): Promise<Escort[]> {
    const response = await apiClient.request<Escort[]>(`/api/v1/escorts/featured?limit=${limit}`);
    return response.data || [];
  },

  // Get escorts by location
  async getByLocation(location: string, limit: number = 20): Promise<Escort[]> {
    const response = await apiClient.request<Escort[]>(`/api/v1/escorts/location/${location}?limit=${limit}`);
    return response.data || [];
  },

  // Increment view count
  async incrementViews(id: string): Promise<boolean> {
    const response = await apiClient.request(`/api/v1/escorts/${id}/views`, {
      method: 'POST',
    });
    return response.success;
  },

  // Toggle favorite status
  async toggleFavorite(id: string): Promise<boolean> {
    const response = await apiClient.request(`/api/v1/escorts/${id}/favorite`, {
      method: 'POST',
    });
    return response.success;
  },

  // Get user's favorite escorts
  async getFavorites(): Promise<Escort[]> {
    const response = await apiClient.request<Escort[]>('/api/v1/escorts/favorites');
    return response.data || [];
  },

  // Verify escort (admin only)
  async verify(id: string, status: 'verified' | 'rejected', reason?: string): Promise<boolean> {
    const response = await apiClient.request(`/api/v1/escorts/${id}/verify`, {
      method: 'POST',
      body: JSON.stringify({ status, reason }),
    });
    return response.success;
  },

  // Toggle featured status (admin only)
  async toggleFeatured(id: string): Promise<boolean> {
    const response = await apiClient.request(`/api/v1/escorts/${id}/featured`, {
      method: 'POST',
    });
    return response.success;
  },
};

// Export convenience functions
export const {
  getAll,
  getById,
  create,
  update,
  delete: deleteEscort,
  uploadPhotos,
  deletePhoto,
  uploadVideos,
  deleteVideo,

  getStats,
  getFeatured,
  getByLocation,
  incrementViews,
  toggleFavorite,
  getFavorites,
  verify,
  toggleFeatured,
} = escorts; 