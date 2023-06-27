FROM rust:latest
ENV NODE_VERSION=16.13.0
RUN curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
ENV NVM_DIR=/root/.nvm
RUN . "$NVM_DIR/nvm.sh" && nvm install ${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm use v${NODE_VERSION}
RUN . "$NVM_DIR/nvm.sh" && nvm alias default v${NODE_VERSION}
ENV PATH="/root/.nvm/versions/node/v${NODE_VERSION}/bin/:${PATH}"
RUN apt update && apt upgrade -y
RUN apt install -y g++-mingw-w64-x86-64 
RUN rustup target add x86_64-pc-windows-gnu 
RUN rustup toolchain install stable-x86_64-pc-windows-gnu 
RUN cargo install tauri-cli
WORKDIR /app
CMD ["cargo", "tauri", "build" ]
# CMD ["npm", "install"]
# CMD ["cargo", "build", "--target", "x86_64-pc-windows-gnu", "--release"]
