const smartgrid = require('smart-grid');

const settings = {
	 outputStyle: 'less',
	 columns: 12,
	 offset: "30px",
	 container: {
        maxWidth: "1200px",
        fields: "15px"
    },
	breakPoints: {
        lg: {
            width: "1024px"
        },
        md: {
            width: "768px",
            fields: "15px"
        },
        sm: {
            width: "425px",
			fields: "15px"
        },
        xs: {
            width: "375px",
			fields: "15px"
        }
	}
};

smartgrid('./src/less', settings);