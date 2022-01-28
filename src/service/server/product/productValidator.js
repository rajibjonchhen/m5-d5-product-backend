import {} from 'express'
import {body} from 'express-validator'

export const productValidator = [
    body('name').exists().withMessage('name is mandatory'),
    body('description').exists().withMessage('description is mandatory'),
    body('brand').exists().withMessage('brand is mandatory'),
    body('price').exists().withMessage('price is mandatory'),
    body('category').exists().withMessage('category is mandatory')
]

