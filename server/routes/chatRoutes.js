const express = require('express');
const { recommend } = require('../controllers/chatController');

const router = express.Router();

/**
 * @route   POST /api/chat/recommend
 * @desc    Recomendar platos/menú según mensaje del usuario (OpenAI)
 * @access  Public
 */
router.post('/recommend', recommend);

module.exports = router;
