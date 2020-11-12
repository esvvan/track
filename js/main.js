window.addEventListener('load', () => {
    /** Recibe dos fechas y retorna la cantidad de días entre estas. */
    var dateDiffInDays = (date1, date2) => {
        const _MS_PER_DAY = 1000 * 60 * 60 * 24;
        // Discard the time and time-zone information.
        const utc1 = Date.UTC(date1.getFullYear(), date1.getMonth(), date1.getDate());
        const utc2 = Date.UTC(date2.getFullYear(), date2.getMonth(), date2.getDate());
        return Math.floor((utc2 - utc1) / _MS_PER_DAY);
    };
    
    /** Recibe una fecha y la retorna en MMM-DD-YYYY. */
    var formattedDate = (date) => {
        const months = {
            0: 'Jan', 
            1: 'Feb', 
            2: 'Mar', 
            3: 'Apr', 
            4: 'May', 
            5: 'Jun', 
            6: 'Jul', 
            7: 'Aug', 
            8: 'Sep', 
            9: 'Oct', 
            10: 'Nov', 
            11: 'Dec', 
        };
        return months[date.getMonth()] + '-' + date.getDate() + '-' + date.getFullYear();
    };
    
    /** Recibe la cantidad de días y devuelve un Ontime o Late. */
    var status = (totalDays) => {
        return (totalDays < 14 ? 'On Time' : 'Late');
    };

    const myTable = document.getElementById('trackTable');
    var now = new Date();
    
    /** El JSON viene de otro archivo, referenciado en el HTML. */
    dataJSON.forEach( row => {
        let startDate = new Date(row.startDate);
        let dueDate = new Date(row.startDate);

        dueDate.setDate(startDate.getDate() + 14);
        let totalDays = dateDiffInDays(startDate, now);

        let myRow = document.createElement('tr');
        myRow.innerHTML = `
            <tr>
                <td class="row">${row.requiredBy}</td>
                <td class="row wide-column">${formattedDate(startDate)}</td>
                <td class="row">${totalDays}</td>
                <td id="status" class="row">${status(totalDays)}</td>
                <td class="row">${row.partNumber}</td>
                <td class="row">${row.description}</td>
                <td class="signCell">
                    <div title="${row.signs.dws.closeDate}" class="signs ${row.signs.dws.estatus}">${row.signs.dws.responsible}</div>
                </td>
                <td class="signCell">
                    <div title="${row.signs.coo.closeDate}" class="signs ${row.signs.coo.estatus}">${row.signs.coo.responsible}</div>
                </td>
                <td class="signCell">
                    <div title="${row.signs.hts.closeDate}" class="signs ${row.signs.hts.estatus}">${row.signs.hts.responsible}</div>
                </td>
                <td class="signCell">
                    <div title="${row.signs.ps1.closeDate}" class="signs ${row.signs.ps1.estatus}">${row.signs.ps1.responsible}</div>
                </td>
                <td class="signCell">
                    <div title="${row.signs.ps2.closeDate}" class="signs ${row.signs.ps2.estatus}">${row.signs.ps2.responsible}</div>
                </td>
                <td class="signCell">
                    <div title="${row.signs.ps3.closeDate}" class="signs ${row.signs.ps3.estatus}">${row.signs.ps3.responsible}</div>
                </td>
                <td class="signCell">
                    <div title="${row.signs.ps4.closeDate}" class="signs ${row.signs.ps4.estatus}">${row.signs.ps4.responsible}</div>
                </td>
                <td class="signCell">
                    <div title="${row.signs.ps5.closeDate}" class="signs ${row.signs.ps5.estatus}">${row.signs.ps5.responsible}</div>
                </td>
                <td class="signCell">
                    <div title="${row.signs.ps6.closeDate}" class="signs ${row.signs.ps6.estatus}">${row.signs.ps6.responsible}</div>
                </td>
                <td class="signCell">
                    <div title="${row.signs.ps7.closeDate}" class="signs ${row.signs.ps7.estatus}">${row.signs.ps7.responsible}</div>
                </td>
                <td class="signCell">
                    <div title="${row.signs.ps8.closeDate}" class="signs ${row.signs.ps8.estatus}">${row.signs.ps8.responsible}</div>
                </td>
                <td class="signCell">
                    <div title="${row.signs.ps9.closeDate}" class="signs ${row.signs.ps9.estatus}">${row.signs.ps9.responsible}</div>
                </td>
                <td class="signCell">
                    <div title="${row.signs.p10.closeDate}" class="signs ${row.signs.p10.estatus}">${row.signs.p10.responsible}</div>
                </td>
                <td class="signCell">
                    <div title="${row.signs.p11.closeDate}" class="signs ${row.signs.p11.estatus}">${row.signs.p11.responsible}</div>
                </td>
                <td class="signCell">
                    <div title="${row.signs.p12.closeDate}" class="signs ${row.signs.p12.estatus}">${row.signs.p12.responsible}</div>
                </td>
                <td class="signCell">
                    <div title="${row.signs.p13.closeDate}" class="signs ${row.signs.p13.estatus} side">${row.signs.p13.responsible}</div>
                </td>
                <td class="signCell">
                    <div title="${row.signs.p14.closeDate}" class="signs ${row.signs.p14.estatus} side">${row.signs.p14.responsible}</div>
                </td>
                <td class="signCell">
                    <div title="${row.signs.p15.closeDate}" class="signs ${row.signs.p15.estatus} side">${row.signs.p15.responsible}</div>
                </td>
                <td class="signCell">
                    <div title="${row.signs.p16.closeDate}" class="signs ${row.signs.p16.estatus} side">${row.signs.p16.responsible}</div>
                </td>
            </tr>
        `;
        myTable.children[1].appendChild(myRow);
    });

    /** Toma todos los status, lo recorre, y les da un estilo CSS dependiendo de su status. */
    let arrStatus = document.querySelectorAll('#status');
    arrStatus.forEach( cell => {
        let state = (cell.innerText == 'On Time' ? 'doneOnTime' : 'pendingLate');
        cell.classList.add(state);
    });

    /** Toma cada cuadrito de firmas y dependiendo del status y su tiempo, le asigna un estilo CSS.*/
    let setStateColors = () => {
        let arrSigns = document.querySelectorAll('tbody tr');
        arrSigns.forEach( row => {
            let dueDate = new Date(row.children[2].innerText);
            let arrCells = row.querySelectorAll('.signs');
            arrCells.forEach(cell => {
                let mCloseDate = new Date(cell.title);
                let newClass = (closeDate, dueDate) => {
                    let state = (cell.classList.contains('done') ? 'done' : 'pending');
                    let time = (closeDate >= dueDate ? 'Late' : 'OnTime');
                    return state + time;
                };
                cell.classList.replace('done', newClass(mCloseDate, dueDate));
                cell.classList.replace('pending', newClass(mCloseDate, dueDate));
            });
        });
    };
    setStateColors();

    let signsArray = document.querySelectorAll('.signs');
    signsArray.forEach(cell => {
        cell.addEventListener('click', () => {
            closeWindow();
            let window = document.createElement('div');
            let myCard = document.createElement('div');
            window.classList.add('window');
            if (cell.classList.contains('side')) {
                window.style.marginLeft = '-135px';
            }
            myCard.id = 'myCard';
            myCard.innerHTML = `
                <div id="closeButton" class="closeBtn">x</div>
                <div class="clearFix"></div>
                <div class="circle pendingLate"></div>
                <div class="circle pendingOnTime"></div>
                <div class="circle doneOnTime"></div>
                <div class="clearFix"></div>
                <input type="text" name="signerTxt" id="signerTxt">
                <input type="button" value="*" id="submitBtn">
            `;
            window.appendChild(myCard);

            myCard.style.display = 'block';
            window.style.display = 'block';
            cell.parentElement.appendChild(window);

            //remove card.
            let closeBtn = myCard.querySelector('#closeButton');
            closeBtn.addEventListener('click', () => {
                closeWindow();  
            });

            //change color.
            let colorBtn = myCard.querySelectorAll('.circle');
            colorBtn.forEach(elem => {
                elem.addEventListener('click', () => {
                    cell.classList.replace(cell.classList.item(1), elem.classList.item(1));
                });
            });

            //submit button.
            let submitBtn = myCard.querySelector('#submitBtn');
            submitBtn.addEventListener('click', () => {
                let inputText = document.querySelector('#signerTxt');
                let strInput = inputText.value;
                cell.innerText = strInput.slice(0, 3).toUpperCase();
                inputText.value = '';
            });
        });
    });

    let closeWindow = () => {
        let disappear = document.querySelectorAll('.window');
        disappear.forEach(element => {
            element.style.animation = 'closePopUp 170ms linear';
            setTimeout( () => {
                element.parentElement.removeChild(element);
            }, 168);
        });
    };
    
});
