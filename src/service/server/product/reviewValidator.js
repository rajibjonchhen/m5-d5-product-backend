import {} from 'express'
import {body} from 'express-validator'

export const reviewValidator = [
    body('comment').exists().withMessage('Comment is mandatory'),
    body('rate').exists().withMessage('Rating is mandatory')
]