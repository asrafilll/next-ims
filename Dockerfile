FROM node:20-alpine

# Install pnpm
RUN npm install -g pnpm

WORKDIR /app

# Copy pnpm-lock.yaml in addition to package.json
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

COPY . .

# Generate database schema
RUN pnpm db:generate

# Build the Next.js application
RUN pnpm build

EXPOSE 3000

# Run migrations and start the app
CMD pnpm db:migrate && pnpm start