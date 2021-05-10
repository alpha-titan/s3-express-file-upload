require("dotenv").config();
const S3 = require("aws-sdk/clients/s3");

// const fs = require("fs");
const bucketName = process.env.AWS_BUCKET_NAME;
const awsAccessKey = process.env.AWS_ACCESS_ID_KEY;
const bucketRegion = process.env.AWS_BUCKET_REGION;
const awsSecretKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
	region: bucketRegion,
	accessKeyId: awsAccessKey,
	secretAccessKey: awsSecretKey,
});

module.exports = {
	//? Upload to S3
	uploadFile: (fileStream, fileName) => {
		console.log("FILESTRAM", fileStream);
		const uploadParams = {
			Bucket: bucketName,
			Body: fileStream,
			Key: fileName,
		};
		return s3.upload(uploadParams).promise();
	},
	//? Download from S3
	downloadFile: (fileKey) => {
		const donwloadParams = {
			Key: fileKey,
			Bucket: bucketName,
		};
		return s3.getObject(donwloadParams).createReadStream();
	},
};
