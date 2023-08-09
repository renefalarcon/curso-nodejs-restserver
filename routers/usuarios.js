const { Router } = require("express")
const {usuarioGet, usuarioPut, usuarioPost, usuarioDelete, usuarioPatch} = require('../controllers/usuarios');
const { check } = require("express-validator");
const { validarCampos } = require("../middlewares/validar-campos");
const { esRolValido, emailExiste, usuarioExiste } = require("../helpers/db-validators");



const router = Router();

router.get('/',  usuarioGet );

router.put('/:id',[
    check('id','No es un id valido').isMongoId(),
    check('id').custom(usuarioExiste),
    validarCampos,
    
],  usuarioPut);

router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password debe tener un largo de 6 letras').isLength({min:6}),
    //check('correo','El correo no es valido').isEmail(),
    //check('rol','El rol no es valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('correo').custom(emailExiste).isEmail(),
    check('rol').custom( esRolValido),
    validarCampos
], usuarioPost);

router.delete('/:id',[
    check('id','No es un id valido').isMongoId(),
    check('id').custom(usuarioExiste),
    validarCampos
] ,usuarioDelete);

router.patch('/',usuarioPatch);

module.exports = router;