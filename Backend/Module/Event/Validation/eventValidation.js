import * as yup from 'yup';
import mongoose from 'mongoose';

const isValidObjectId = (value) =>
    value ? mongoose.Types.ObjectId.isValid(value) : false;

export const addEventSchema = yup.object({
    body: yup.object({
        title: yup.string().trim().required('Title is required'),
        description: yup.string().trim().optional(),
        fromDate: yup
            .date()
            .required('fromDate is required')
            .typeError('fromDate must be a valid date'),
        toDate: yup
            .date()
            .typeError('toDate must be a valid date')
            .optional()
            .when('fromDate', (fromDate, schema) =>
                fromDate
                    ? schema.min(fromDate, 'toDate must be after fromDate')
                    : schema
            ),
        duration: yup
            .number()
            .positive('Duration must be a positive number')
            .optional(),
        participants: yup
            .array()
            .of(
                yup
                    .string()
                    .test('is-object-id', 'Invalid participant id', isValidObjectId)
            )
            .min(1, 'At least one participant is required')
            .required('Participants are required'),
    }),
});

export const updateEventSchema = yup.object({
    body: yup.object({
        id: yup
            .string()
            .required('Event id is required')
            .test('is-object-id', 'Invalid event id', isValidObjectId),
        title: yup.string().trim().optional(),
        description: yup.string().trim().optional(),
        fromDate: yup.date().typeError('fromDate must be a valid date').optional(),
        toDate: yup
            .date()
            .typeError('toDate must be a valid date')
            .when('fromDate', (fromDate, schema) =>
                fromDate
                    ? schema.min(fromDate, 'toDate must be after fromDate')
                    : schema
            )
            .optional(),
        duration: yup.number().positive().optional(),
        participants: yup
            .array()
            .of(
                yup
                    .string()
                    .test('is-object-id', 'Invalid participant id', isValidObjectId)
            )
            .optional(),
    }),
});

export const deleteEventSchema = yup.object({
    body: yup.object({
        id: yup
            .string()
            .required('Event id is required')
            .test('is-object-id', 'Invalid event id', isValidObjectId),
    }),
});