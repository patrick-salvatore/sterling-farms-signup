# Variables
DOCKER_COMPOSE=docker-compose
REDIS_SERVICE=redis

start: # Start the app and redis server
	@echo "Starting api..."
	$(DOCKER_COMPOSE) rm --force -v
	$(DOCKER_COMPOSE) up --remove-orphans
	@echo "API has started."

redis-start:  # Start the Redis server
	@echo "Starting Redis container..."
	$(DOCKER_COMPOSE) rm --force -v
	$(DOCKER_COMPOSE) up $(REDIS_SERVICE) --remove-orphans
	@echo "Redis container started."

# Target to shell into the Redis container and run Redis commands
redis-shell: 
	@echo "Starting Redis server"
	$(DOCKER_COMPOSE) up -d $(REDIS_SERVICE) --remove-orphans
	@echo "Shelling into Redis container"
	docker exec -it $(REDIS_SERVICE) redis-cli
	@echo "Stopping Redis server..."
	$(DOCKER_COMPOSE) down --volumes

# Clean up resources
clean:
	@echo "Cleaned up all running processes."
	$(DOCKER_COMPOSE) rm --force --stop --volumes
