const router = require('express').Router();
const jwt=require('jsonwebtoken');
const bcrypt=require('bcryptjs');
const session=require('express-session');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

