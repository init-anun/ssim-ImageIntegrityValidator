import client from '../api/client';
import type { DetectionRequest, DetectionResponse, GeneratedFiles } from '@/types/detection';

export const DetectTampering = async (data: DetectionRequest): Promise<DetectionResponse> => {
    const formData = new FormData();

    
    // 1. Fixed the key names to match your FastAPI arguments exactly
    formData.append('original_file', data.original_image);
    formData.append('tampered_file', data.tampered_image);

    console.log('Sending detection request with data:', {
        original_file: data.original_image,
        tampered_file: data.tampered_image,
    });

    try {
        
        const response = await client.post('/detection/detect', formData, {
            // 2. Cleaned out manual headers. 
            // Letting Axios natively calculate boundaries stops the 422 error.
        });
        return response.data as DetectionResponse;
    } catch (error) {
        console.error('Error detecting tampering:', error);
        throw error;
    }
};