import React from 'react';

export type DetectionRequest = {
    original_image: File;
    tampered_image: File;
}


export type GeneratedFiles = {
    original_detected: string;
    tampered_detected: string;
    difference: string;
    threshold: string;
}

export type DetectionResponse = {
    success: boolean;
    similarity_score: number;
    message: string;
    generated_files: GeneratedFiles;
}
