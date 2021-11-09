$(function(){
    $.fn.pagination = function(data, limit) {

        //Todo: Render/create table
        function renderTable(start, end, limit, data) {
            let tmpHTML = '';
            for (let i = start; i < Math.min(end, limit); i++) {
                tmpHTML +=  "<tr><td class='text-center'>"+data.users[i].id+
                            "</td><td>"+data.users[i].name+
                            "</td><td>"+data.users[i].email+
                            "</td><td class='text-end'>"+data.users[i].mobile+
                            "</td><td class='text-center'><button class='btn btn-success'>"+"Detail"+
                                    "</button><a href='/edituser/"+data.users[i].id+"' class='btn btn-success ms-3'>"+"Edit"+
                                    "</a><button class='btn btn-danger ms-3'>"+"Delete"+
                            "</button></td></tr>";
            };

            return tmpHTML;
        };

        //TODO: First Running pagination
        let $table = $(this);
        let tableId = $table.attr('id');
        let page = 1;
        limit = limit < 1 ? 5 : (limit || 5);

        $table.find('tbody').empty().html(renderTable(0, data.users.length, limit, data));

        $table.after(
            "<div id='after' class='fixed-bottom'>"+
                "<div class='container mb-4'>" +
                    "<div class='justify-content-md-center row'>"+
                        "<div class='col-md-auto'>"+
                            "<label class='pt-1'>Show</label>"+
                        "</div>"+
                        "<div class='col-md-auto'>"+
                            "<select class='form-select' id='limit'>"+
                                "<option value=''></option>"+
                                "<option value='5'>5</option>"+
                                "<option value='10'>10</option>"+
                                "<option value='15'>15</option>"+
                            "</select>"+
                        "</div>"+
                        "<div class='col-md-auto'>"+
                            "<label class='pt-1'>Per Page</label>"+
                        "</div>"+
                        "<div class='col-md-auto'>"+
                            "<nav>"+
                                "<ul class='pagination'>"+
                                    "<li id='firstPrev' class='page-item'> <a class='page-link first-link'>&lt;</a> </li>"+
                                    "<li id='previous' class='page-item'> <a class='page-link'>&laquo;</a> </li>"+
                                    "<li id='page' class='page-item'></li>"+
                                    "<li id='next' class='page-item'> <a class='page-link'>&raquo;</a> </li>"+
                                    "<li id='lastNext' class='page-item'> <a class='page-link first-link'>&gt;</a> </li>"+
                                "</ul>"+
                            "</nav>"+
                        "</div>"+
                    "</div>"+
                "</div>"+

                "<div class='container-fluid bg-dark'>"+
                    "<div class='row'>"+
                        "<div class='col'>"+
                            "<p class='text-center text-white my-2'>copyright© RiefDev 2021</p>"+
                        "</div>"+
                    "</div>"+
                "</div>"+
            "</div>"
        );

        //Todo: first counter pagination
        if (data.users.length) {
            let totalPage = Math.ceil(data.users.length/5);
            let text = "<a class='page-link'>Page 1 of "+totalPage+"</a>";

            $('ul.pagination > li#page').empty().append(text);
            $('ul.pagination > li#previous').addClass('disabled');
            $('ul.pagination > li#firstPrev').addClass('disabled');

            counterPage(limit)

        } else {
            let text = "<a class='page-link'>Nothing Data</a>";

            $('ul.pagination > li#page').empty().append(text);
        };

        counterPage(limit);

        function counterPage(lim) {
            if (data.users.length > lim) {
                let totalPage = Math.ceil(data.users.length/lim);

                $('ul.pagination > li#next').removeClass('disabled');
                $('ul.pagination > li#lastNext').removeClass('disabled');

                let text = "<a class='page-link'>Page "+page+" of "+totalPage+"</a>";
                $('ul.pagination > li#page').empty().append(text);

                $('ul.pagination > li#next').click(function(){
                    if (!$(this).hasClass('disabled')) {
                        let totalPage = Math.ceil(data.users.length/lim);
                        let pagePlus = page + 1;

                        let size = data.users.length
                        let start = (pagePlus - 1) * lim;
                        let end = pagePlus * lim;


                        $table.find('tbody').empty().html(renderTable(start, size, end, data));

                        let text = "<a class='page-link'>Page "+pagePlus+" of "+totalPage+"</a>";
                        $('#page').empty().append(text);

                        $('ul.pagination > li#firstPrev').removeClass('disabled');
                        $('ul.pagination > li#previous').removeClass('disabled');
                        if (end >= size) {
                            $('ul.pagination > li#next').addClass('disabled');
                            $('ul.pagination > li#lastNext').addClass('disabled');
                        }
                        page = pagePlus;
                    };
                });

                $('ul.pagination > li#lastNext').click(function(){
                    if (!$(this).hasClass('disabled')) {
                        let totalPage = Math.ceil(data.users.length/lim);
                        page = totalPage;

                        let size = data.users.length;
                        let start = (page - 1) * lim;
                        let end = page * lim;

                        $table.find('tbody').empty().html(renderTable(start, size, end, data));

                        let text = "<a class='page-link'>Page "+page+" of "+totalPage+"</a>";
                        $('ul.pagination > li#page').empty().append(text);

                        $('ul.pagination > li#firstPrev').removeClass('disabled');
                        $('ul.pagination > li#previous').removeClass('disabled');
                        if (end >= size) {
                            $('ul.pagination > li#next').addClass('disabled');
                            $('ul.pagination > li#lastNext').addClass('disabled');
                        };

                    };
                });

                $('ul.pagination > li#previous').click(function(){
                    if (!$(this).hasClass('disabled')) {
                        let totalPage = Math.ceil(data.users.length/lim);
                        let minPage = page - 1

                        let size = data.users.length;
                        let start = (minPage - 1) * lim;
                        let end = minPage * lim;

                        $table.find('tbody').empty().html(renderTable(start, size, end, data));

                        let text = "<a class='page-link'>Page "+minPage+" of "+totalPage+"</a>";
                        $('ul.pagination > li#page').empty().append(text);

                        $('ul.pagination > li#next').removeClass('disabled');
                        $('ul.pagination > li#lastNext').removeClass('disabled');
                        if (!start) {
                            $('ul.pagination > li#firstPrev').addClass('disabled');
                            $('ul.pagination > li#previous').addClass('disabled');
                        };

                        page = minPage;
                    };
                });

                $('ul.pagination > li#firstPrev').click(function(){
                    if (!$(this).hasClass('disabled')) {
                        let totalPage = Math.ceil(data.users.length/lim);
                        page = 1;

                        let size = data.users.length;
                        let start = (page - 1) * lim;
                        let end = page * lim;

                        $table.find('tbody').empty().html(renderTable(start, size, end, data));

                        let text = "<a class='page-link'>Page "+page+" of "+totalPage+"</a>";
                        $('ul.pagination > li#page').empty().append(text);

                        $('ul.pagination > li#next').removeClass('disabled');
                        $('ul.pagination > li#lastNext').removeClass('disabled');
                        if (!start) {
                            $('ul.pagination > li#firstPrev').addClass('disabled');
                            $('ul.pagination > li#previous').addClass('disabled');
                        };
                    };
                });

            } else if (data.users.length <= lim) {
                $('ul.pagination > li#next').addClass('disabled');
                $('ul.pagination > li#lastNext').addClass('disabled');
                $('ul.pagination > li#previous').addClass('disabled');
                $('ul.pagination > li#firstPrev').addClass('disabled');

                let text = "<a class='page-link'>All Data</a>";
                $('ul.pagination > li#page').empty().append(text);
            };
        };

        $('.sorting').click(function () {

            let direction = $(this).hasClass('asc') ? 'desc' : 'asc';
            let columnName = $(this).attr('id');

            $('.sorting').removeClass('asc desc');

            data.users.sort(sortFn(columnName)[direction]);

            $table.find('tbody').empty().html(renderTable(0, data.users.length, limit, data));

            $(this).addClass(direction);
        });

        var sortFn = function (key) {
            return {
                desc: function (a, b) {
                    if (typeof a[key] !== 'object')
                        return a[key] > b[key] ? -1 : (a[key] < b[key] ? 1  : 0);
                    else
                        return a[key].sort > b[key].sort ? -1 : (a[key].sort < b[key].sort ? 1  : 0);
                },
                asc: function (a, b) {
                    if (typeof a[key] !== 'object')
                        return a[key] < b[key] ? -1 : (a[key] > b[key] ? 1  : 0);
                    else
                        return a[key].sort < b[key].sort ? -1 : (a[key].sort > b[key].sort ? 1  : 0);
                }
            };
        };

    };
});