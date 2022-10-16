const codes = {
  OK: {
    code: 200,
    description: 'La solicitud tuvo éxito.',
  },
  Created: {
    code: 201,
    description: 'La solicitud se cumplió y se creó un nuevo recurso.',
  },
  'No Content': {
    code: 204,
    description:
      'La solicitud se ha procesado correctamente, pero no devuelve ningún contenido.',
  },
  'Bad Request': {
    code: 400,
    description:
      'El servidor no puede o no procesará la solicitud debido a un aparente error del cliente.',
  },
  Unauthorized: {
    code: 401,
    description:
      'El usuario no tiene credenciales de autenticación válidas para el recurso de destino.',
  },
  Forbidden: {
    code: 403,
    description:
      'La solicitud era válida, pero el servidor rechaza la acción. Es posible que el usuario no tenga los permisos necesarios para un recurso o que necesite una cuenta de algún tipo.',
  },
  'Not Found': {
    code: 404,
    description: 'No se encontró el registro solicitado.',
  },
  'Method Not Allowed': {
    code: 405,
    description:
      'No se admite un método de solicitud para el recurso solicitado.',
  },
  'Not Acceptable': {
    code: 406,
    description:
      'El recurso solicitado es capaz de generar solo contenido no aceptable de acuerdo con los encabezados de aceptación enviados en la solicitud.',
  },
  Gone: {
    code: 410,
    description:
      'Indica que el recurso solicitado ya no está disponible y no volverá a estar disponible.',
  },
  'Precondition Failed': {
    code: 412,
    description:
      'El servidor no cumple con una de las condiciones previas que el solicitante puso en la solicitud.',
  },
  'Too Many Requests': {
    code: 429,
    description:
      'El usuario ha enviado demasiadas solicitudes en un período de tiempo determinado. Diseñado para usarse con esquemas de limitación de velocidad.',
  },
  'Login Time-out': {
    code: 440,
    description:
      'La sesión del cliente ha caducado y debe iniciar sesión de nuevo.',
  },
  'Unavailable For Legal Reasons': {
    code: 451,
    description:
      'Un operador de servidor ha recibido una demanda legal para denegar el acceso a un recurso oa un conjunto de recursos que incluye el recurso solicitado.',
  },
  'Invalid Credentials': {
    code: 460,
    description: 'Las credenciales de usuario no coinciden.',
  },
  'Not Verified': {
    code: 461,
    description: 'El usuario no está verificado.',
  },
  'Invalid Token': {
    code: 462,
    description: 'El token no existe, caducó o ha cambiado.',
  },
  'Already Exists': {
    code: 463,
    description: 'El recurso que está intentando crear ya existe',
  },
  'Validation Error': {
    code: 464,
    description: 'La solicitud no pasa la validación del punto final',
  },
  'Fingerprint Not Found': {
    code: 465,
    description: 'La solicitud no tiene huella digital en los encabezados',
  },
  'Session Already Exists': {
    code: 465,
    description: 'Ya existe una sesión con la huella enviada',
  },
  'Internal Server Error': {
    code: 500,
    description: 'Error de servidor interno',
  },
  'PSQL Error': {
    code: 560,
    description: 'PSQL Error',
  },
  'Image Upload Failed': {
    code: 561,
    description:
      'La carga de la imagen ha fallado. Puede ser para Amazon S3 Service o para el propio servidor',
  },
  'External Service Error': {
    code: 562,
    description:
      'La solicitud no puede continuar debido a un error de servicio externo',
  },
};

module.exports = codes;
