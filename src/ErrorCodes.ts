export type TErrorCode = {
  code : string,
  i18n : {
    [languageAcronym: string] : string
  },
};

// @ts-ignore
const example = {
  ERROR_NAME : {
    code : 'AA00001',
    i18n : {
      en : 'Unknown error',
      es : 'Error desconocido',
    }
  },
}

const errorCodes = {
  UNKNOWN : {
    code : 'AA00001',
    i18n : {
      en : 'Unknown error',
      es : 'Error desconocido',
    },
  },

  SERVER_ERROR : {
    code : 'AA00002',
    i18n : {
      en : 'Server error',
      es : 'Error en el servidor',
    },
  },
  NOT_FOUND : {
    code : 'AA00003',
    i18n : {
      en : 'Resource not found',
      es : 'Recurso no encontrado',
    },
  },
  FORBIDDEN : {
    code : 'AA00004',
    i18n : {
      en : 'Forbidden access',
      es : 'Acceso denegado',
    },
  },
  UNAUTHORIZED : {
    code : 'AA00005',
    i18n : {
      en : 'Unauthorized access',
      es : 'Acceso no autorizado',
    },
  },
  BAD_REQUEST : {
    code : 'AA00006',
    i18n : {
      en : 'Bad request',
      es : 'Petición inválida',
    },
  },

  DATABASE_ERROR_CONNECTING: {
		code: "AA000021",
		i18n: {
			en: "Couldn't set database connection",
			es: "No se pudo conectar a la base de datos",
			ca: "No s'ha pogut connectar a la base de dades",
		},
	},

};

export default errorCodes;
