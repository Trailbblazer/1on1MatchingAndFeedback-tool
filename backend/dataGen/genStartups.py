import json

# Generate 8 startups with the specified format
startups = {}
for i in range(0, 6):
    startup_name = f"Startup {i}"
    startups[startup_name] = {
        "startup_id": i,
        "meetings_count": 0
    }

# Write the output to a JSON file
output_file = "data/startups.json"
with open(output_file, "w") as file:
    json.dump(startups, file, indent=4)

print(f"Startup data has been successfully written to {output_file}.")
