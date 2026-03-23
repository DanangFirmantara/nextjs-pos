package com.pos.util;

// Lombok removed for Java 26 compatibility; manual builder implemented
public class ApiResponse<T> {
    private Boolean success;
    private String message;
    private T data;
    private String timestamp;

    public ApiResponse() {}

    public ApiResponse(Boolean success, String message, T data, String timestamp) {
        this.success = success;
        this.message = message;
        this.data = data;
        this.timestamp = timestamp;
    }

    public Boolean getSuccess() {
        return success;
    }
    public void setSuccess(Boolean success) {
        this.success = success;
    }
    public String getMessage() {
        return message;
    }
    public void setMessage(String message) {
        this.message = message;
    }
    public T getData() {
        return data;
    }
    public void setData(T data) {
        this.data = data;
    }
    public String getTimestamp() {
        return timestamp;
    }
    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

    public static <T> Builder<T> builder() {
        return new Builder<>();
    }

    public static class Builder<T> {
        private Boolean success;
        private String message;
        private T data;
        private String timestamp;

        public Builder<T> success(Boolean success) {
            this.success = success;
            return this;
        }
        public Builder<T> message(String message) {
            this.message = message;
            return this;
        }
        public Builder<T> data(T data) {
            this.data = data;
            return this;
        }
        public Builder<T> timestamp(String timestamp) {
            this.timestamp = timestamp;
            return this;
        }
        public ApiResponse<T> build() {
            return new ApiResponse<>(success, message, data, timestamp);
        }
    }

    public static <T> ApiResponse<T> success(String message, T data) {
        return ApiResponse.<T>builder()
            .success(true)
            .message(message)
            .data(data)
            .timestamp(String.valueOf(System.currentTimeMillis()))
            .build();
    }

    public static <T> ApiResponse<T> error(String message) {
        return ApiResponse.<T>builder()
            .success(false)
            .message(message)
            .timestamp(String.valueOf(System.currentTimeMillis()))
            .build();
    }
}
