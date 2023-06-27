#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::{fs::OpenOptions, io::{Write, Read}};

use tauri::{Menu, CustomMenuItem, Submenu};

#[tauri::command(rename_all = "snake_case")]
fn save_file(state: String, path: String) {
    let mut file = OpenOptions::new()
        .write(true)
        .truncate(true)
        .create(true)
        .open(&path).unwrap();
    
    file.write(state.as_bytes()).unwrap();
}

#[tauri::command(rename_all = "snake_case")]
fn load_file(path: String) -> String {
    let mut file = OpenOptions::new()
        .read(true)
        .open(&path).unwrap();
    
    let mut state: String = String::with_capacity(512);
    file.read_to_string(&mut state).unwrap();
    
    state
}

fn main() {
    
    let save = CustomMenuItem::new("save_graph", "Save Graph");
    let load = CustomMenuItem::new("load_graph", "Load Graph");
    let graphs = Submenu::new("Graph", Menu::new().add_item(save).add_item(load));
    let menu = Menu::os_default("macOS").add_submenu(graphs);
    
    tauri::Builder::default()
        .menu(menu)
        .invoke_handler(tauri::generate_handler![save_file, load_file])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
