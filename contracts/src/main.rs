use std::env;

fn main() {
    let args: Vec<String> = env::args().collect();
    
    if args.len() < 2 {
        eprintln!("Usage: {} <service|contract>", args[0]);
        std::process::exit(1);
    }

    match args[1].as_str() {
        "service" => {
            println!("Starting RWA Tokenization Service...");
            // Service initialization logic
        }
        "contract" => {
            println!("Starting RWA Tokenization Contract...");
            // Contract initialization logic
        }
        _ => {
            eprintln!("Unknown command: {}", args[1]);
            std::process::exit(1);
        }
    }
}



