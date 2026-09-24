'use client';

import React, { useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    FormErrorMessage,
    Text,
} from '@chakra-ui/react';

interface NewProjectModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function NewProjectModal({ isOpen, onClose }: NewProjectModalProps) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [titleTouched, setTitleTouched] = useState(false);
    const [descriptionTouched, setDescriptionTouched] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const isTitleError = title.trim().length === 0;
    const isDescriptionError = description.trim().length === 0;

    const resetForm = () => {
        setTitle('');
        setTitleTouched(false);
        setDescriptionTouched(false);
        setDescription('');
    };

    const handleClose = () => {
        resetForm();
        onClose();
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setTitleTouched(true);
        setDescriptionTouched(true);
        if (isTitleError || isDescriptionError) return;

        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            handleClose();
            alert('Project created successfully!');
        }, 600);
    };

    return (
        <Modal isOpen={isOpen} onClose={handleClose} isCentered size="lg">
            <ModalOverlay bg="blackAlpha.700" backdropFilter="blur(8px)" />
            <ModalContent
                bg="#1d2433"
                color="white"
                border="1px solid rgba(255, 255, 255, 0.15)"
                borderRadius="16px"
                boxShadow="0 25px 50px -12px rgba(0, 0, 0, 0.7)"
            >
                <form onSubmit={handleSubmit}>
                    <ModalHeader pt={6} pb={2}>
                        <Text fontSize="20px" fontWeight="700">
                            Create project
                        </Text>
                        <Text fontSize="13px" color="rgba(255, 255, 255, 0.6)" fontWeight="400" mt={1}>
                            Set up a workspace for neuroimaging data, processing pipelines, and analysis.
                        </Text>
                    </ModalHeader>
                    <ModalCloseButton color="whiteAlpha.800" />

                    <ModalBody py={4}>
                        <FormControl isInvalid={isTitleError && titleTouched} mb={4} isRequired>
                            <FormLabel fontSize="13px" fontWeight="600" color="rgba(255, 255, 255, 0.9)">
                                Title
                            </FormLabel>
                            <Input
                                value={title}
                                onChange={(e) => {
                                    setTitleTouched(true);
                                    setTitle(e.target.value);
                                }}
                                placeholder="e.g. Longitudinal tractography study"
                                bg="rgba(0, 0, 0, 0.2)"
                                border="1px solid rgba(255, 255, 255, 0.2)"
                                _hover={{ borderColor: '#5cc5d8' }}
                                _focus={{ borderColor: '#5cc5d8', boxShadow: '0 0 0 1px #5cc5d8' }}
                                color="white"
                                fontSize="14px"
                            />
                            {isTitleError && titleTouched && (
                                <FormErrorMessage fontSize="12px" color="red.300">
                                    A title is required
                                </FormErrorMessage>
                            )}
                        </FormControl>

                        <FormControl isInvalid={isDescriptionError && descriptionTouched} isRequired>
                            <FormLabel fontSize="13px" fontWeight="600" color="rgba(255, 255, 255, 0.9)">
                                Description
                            </FormLabel>
                            <Textarea
                                value={description}
                                onChange={(e) => {
                                    setDescriptionTouched(true);
                                    setDescription(e.target.value);
                                }}
                                placeholder="Describe the research question and planned analyses"
                                bg="rgba(0, 0, 0, 0.2)"
                                border="1px solid rgba(255, 255, 255, 0.2)"
                                _hover={{ borderColor: '#5cc5d8' }}
                                _focus={{ borderColor: '#5cc5d8', boxShadow: '0 0 0 1px #5cc5d8' }}
                                color="white"
                                fontSize="14px"
                                rows={4}
                            />
                            {isDescriptionError && descriptionTouched && (
                                <FormErrorMessage fontSize="12px" color="red.300">
                                    A description is required
                                </FormErrorMessage>
                            )}
                        </FormControl>
                    </ModalBody>

                    <ModalFooter borderTop="1px solid rgba(255, 255, 255, 0.08)" py={4}>
                        <Button
                            variant="ghost"
                            color="whiteAlpha.800"
                            _hover={{ bg: 'whiteAlpha.100' }}
                            mr={3}
                            onClick={handleClose}
                            fontSize="14px"
                        >
                            Cancel
                        </Button>
                        <Button
                            type="submit"
                            bg="#3a6f7c"
                            color="white"
                            _hover={{ bg: '#2d5762' }}
                            isLoading={isSubmitting}
                            fontSize="14px"
                        >
                            Create project
                        </Button>
                    </ModalFooter>
                </form>
            </ModalContent>
        </Modal>
    );
}
