use rust_gpiozero::*;
use std::thread::sleep;
use std::time::Duration;

fn main() {
    let led = LED::new(27);

    loop{
        led.on();
        println!("ON!");
        sleep(Duration::from_secs(1));

        led.off();
        println!("OFF!");
        sleep(Duration::from_secs(1));
    }
}