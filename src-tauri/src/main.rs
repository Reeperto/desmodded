#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::{
    fs::OpenOptions,
    io::{Read, Write},
};

use tauri::{AboutMetadata, CustomMenuItem, Manager, Menu, MenuItem, Submenu};

#[tauri::command(rename_all = "snake_case")]
fn save_file(state: String, path: String) {
    let mut file = OpenOptions::new()
        .write(true)
        .truncate(true)
        .create(true)
        .open(path)
        .unwrap();

    file.write_all(state.as_bytes()).unwrap();
}

#[tauri::command(rename_all = "snake_case")]
fn load_file(path: String) -> String {
    let mut file = OpenOptions::new().read(true).open(path).unwrap();

    let mut state: String = String::with_capacity(512);
    file.read_to_string(&mut state).unwrap();

    state
}

fn main() {
    let save = CustomMenuItem::new("save_graph", "Save Graph");
    let load = CustomMenuItem::new("load_graph", "Load Graph");
    let file = Submenu::new("File", Menu::new().add_item(save).add_item(load));

    let menu = Menu::new()
        .add_submenu(Submenu::new(
            "Desmodded",
            Menu::new().add_native_item(MenuItem::About(
                "Desmodded".into(),
                AboutMetadata::default()
                    .authors(vec!["Eli Griffiths".to_string()])
                    .version("1.0.0"),
            )),
        ))
        .add_native_item(MenuItem::Separator)
        .add_submenu(file);

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![save_file, load_file])
        .menu(menu)
        .setup(|app| {
            app.get_window("main")
                .unwrap()
                .menu_handle()
                .show()
                .unwrap();

            Ok(())
        })
        .on_menu_event(|event| match event.menu_item_id() {
            "save_graph" => {
                let _ = event.window().emit("file_management", "save");
            }
            "load_graph" => {
                let _ = event.window().emit("file_management", "load");
            }
            _ => {}
        })
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
