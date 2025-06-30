class ApiResponse {
  constructor(data, statusCode = 200, message = "success") {
    this.message = message;
    this.data = data;
    this.statusCode = statusCode;
    this.success = statusCode >= 200 && statusCode < 300;
    this.error = null;
  }

  send(res) {
    res.status(this.statusCode).json(this.data);
  }
}

export { ApiResponse };

//
