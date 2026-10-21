# Git

## Iniciar un repositorio

| Comando | Descripción |
| --- | --- |
| `git clone <URL>` | Clona un repositorio remoto. |
| `git init` | Inicializa un repositorio vacío en el directorio actual. |
| `git config --global user.name "Nombre"` | Configura el nombre de usuario global. |
| `git config --global user.email "correo@ejemplo.com"` | Configura el correo global. |
| `.gitkeep` | Archivo convencional para conservar una carpeta vacía en Git. |
| `.gitignore` | Archivo que indica qué archivos o carpetas debe ignorar Git. |
| `git config --global alias.<alias> '<comando>'` | Define un alias global para un comando de Git. |

## Estado y cambios

| Comando | Descripción |
| --- | --- |
| `git status` | Muestra el estado del repositorio y del área de preparación. |
| `git add .` | Añade los cambios del directorio actual al área de preparación. |
| `git restore --staged <archivo>` | Quita un archivo del área de preparación sin descartar sus cambios. |
| `git commit -m "Mensaje"` | Crea un commit con los cambios preparados. |
| `git commit -am "Mensaje"` | Prepara y confirma los cambios de archivos ya seguidos por Git. |
| `git commit --amend -m "Mensaje"` | Reemplaza el último commit; úsalo con cuidado si ya lo compartiste. |
| `git log --oneline --graph` | Muestra el historial de commits como un grafo resumido. |
| `git rm --cached <archivo>` | Deja de seguir un archivo sin borrarlo del disco. |
| `git reflog` | Muestra el historial local de movimientos de referencias, como `HEAD`. |

## Ramas, fusiones y rebase

| Comando | Descripción |
| --- | --- |
| `git branch` | Muestra las ramas locales. |
| `git branch -d <rama>` | Elimina una rama local ya integrada. |
| `git switch <rama>` | Cambia a una rama existente. |
| `git switch -c <rama>` | Crea una rama y cambia a ella. |
| `git merge <rama>` | Integra la rama indicada en la rama actual. |
| `git merge --abort` | Cancela una fusión en curso. |
| `git merge --squash <rama>` | Prepara los cambios de la rama como un único conjunto, sin crear el commit de fusión. |
| `git rebase <rama>` | Reaplica los commits de la rama actual sobre la rama indicada. |
| `git rebase -i HEAD~4` | Abre una reescritura interactiva de los últimos cuatro commits. |
| `git revert <commit>` | Crea un commit que revierte los cambios del commit indicado. |
| `git reset --mixed HEAD~2` | Retrocede dos commits y conserva los cambios en el directorio de trabajo, sin preparar. |
| `git reset --soft HEAD~2` | Retrocede dos commits y deja los cambios preparados. |
| `git reset --hard HEAD~2` | Retrocede dos commits y descarta los cambios afectados. **Puede causar pérdida de trabajo.** |
| `git checkout -- .` | Descarta cambios no preparados de archivos seguidos por Git. **Puede causar pérdida de trabajo.** |

## Repositorios remotos

| Comando | Descripción |
| --- | --- |
| `git remote add origin <URL>` | Añade un remoto llamado `origin`. |
| `git remote -v` | Muestra las URL de los remotos configurados. |
| `git fetch` | Descarga referencias y objetos de los remotos sin integrar cambios en la rama actual. |
| `git pull` | Descarga e integra cambios del remoto asociado a la rama actual. |
| `git push -u origin <rama>` | Publica la rama en `origin` y configura su seguimiento remoto. |
| `git push` | Publica los commits de la rama actual en su remoto de seguimiento. |
| `git push --force-with-lease` | Fuerza la publicación si el remoto no tiene cambios nuevos; úsalo con cuidado. |

## Etiquetas

| Comando | Descripción |
| --- | --- |
| `git tag` | Muestra las etiquetas locales. |
| `git tag v1.0` | Crea una etiqueta ligera en el commit actual. |
| `git tag -a v1.0 -m "Versión 1.0 estable"` | Crea una etiqueta anotada. |
| `git push origin v1.0` | Publica la etiqueta `v1.0` en `origin`. |
| `git push origin --tags` | Publica todas las etiquetas locales en `origin`. |
| `git tag -d v1.0` | Elimina la etiqueta local `v1.0`. |
| `git push origin --delete v1.0` | Elimina la etiqueta `v1.0` del remoto `origin`. |

## Stash

| Comando | Descripción |
| --- | --- |
| `git stash` | Guarda temporalmente los cambios del directorio de trabajo y del área de preparación. |
| `git stash list` | Muestra los stashes guardados. |
| `git stash push -m "Descripción"` | Guarda los cambios en un stash con una descripción. |
| `git stash pop` | Aplica el stash más reciente y lo elimina de la lista si se aplicó correctamente. |
| `git stash drop` | Elimina el stash más reciente. |
| `git stash clear` | Elimina todos los stashes. **Esta acción no se puede deshacer fácilmente.** |
