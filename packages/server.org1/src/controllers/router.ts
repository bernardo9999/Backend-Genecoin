import * as express from 'express';
import { 
    NotasController_initNotasOrg1_post,
    NotasController_initNotasOrg2_post,
    NotasController_compareNotasOrg1_post } from './controllers'
export default express.Router()
.post('/notas/initNotasOrg1', NotasController_initNotasOrg1_post)
.post('/notas/initNotasOrg2', NotasController_initNotasOrg2_post)
.post('/notas/compareNotasOrg1', NotasController_compareNotasOrg1_post)
