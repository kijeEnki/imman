export const blockRegistry = {
    "initialize": {
        label: "Initialize ${w}×${h} canvas",
        short_label: "Initialize canvas",
        category: "initialization",
        params: {
            w: {type: "number"}, h: {type: "number"}
        },
        execute(params, ctx, state) {
            ctx.canvas.width = params.w;
            ctx.canvas.height = params.h;
        }
    },
    "comment": {
        label: "Comment ${comment}",
        short_label: "Comment",
        category: "ignored",
        params: {
            comment: {type: "textarea"}
        },
        execute(params, ctx, state) {
            // nothing
        }
    },
    "begin_path": {
        label: "Begin path",
        category: "paths",
        params: {},
        execute(params, ctx, state) {
            ctx.beginPath();
        }
    },
    "close_path": {
        label: "Close current path",
        category: "paths",
        params: {},
        execute(params, ctx, state) {
            ctx.closePath();
        }
    },
    "move": {
        label: "Move to (${x}, ${y})",
        short_label: "Move to point",
        category: "paths",
        params: {
            x: {type: "number"}, y: {type: "number"}
        },
        execute(params, ctx, state) {
            ctx.moveTo(params.x, params.y);
        }
    },
    "stroke_path": {
        label: "Stroke path",
        category: "paths",
        params: {},
        execute(params, ctx, state) {
            ctx.stroke();
        }
    },
    "fill_path": {
        label: "Fill path",
        category: "paths",
        params: {},
        execute(params, ctx, state) {
            ctx.fill();
        }
    },
    "change_stroke": {
        label: "Change stroke style to ${style}",
        short_label: "Change stroke style",
        category: "properties",
        params: {
            style: {type: "text"}
        },
        execute(params, ctx, state) {
            ctx.strokeStyle = params.style;
        }
    },
    "change_fill": {
        label: "Change fill style to ${style}",
        short_label: "Change fill style",
        category: "properties",
        params: {
            style: {type: "text"}
        },
        execute(params, ctx, state) {
            ctx.fillStyle = params.style;
        }
    },
    "change_font": {
        label: "Change font to ${font}",
        short_label: "Change font",
        category: "properties",
        params: {
            font: {type: "text"}
        },
        execute(params, ctx, state) {
            ctx.font = params.font;
        }
    },
    "change_align": {
        label: "Change text alignment to ${align}",
        short_label: "Change text align",
        category: "properties",
        params: {
            align: {type: "text"}
        },
        execute(params, ctx, state) {
            ctx.textAlign = params.align;
        }
    },
    "change_baseline": {
        label: "Change text baseline to ${align}",
        short_label: "Change text baseline",
        category: "properties",
        params: {
            align: {type: "text"}
        },
        execute(params, ctx, state) {
            ctx.textBaseline = params.align;
        }
    },
    "path_line": {
        label: "Add line towards (${x}, ${y}) to path",
        short_label: "Add line",
        category: "path_geometry",
        params: {
            x: {type: "number"}, y: {type: "number"}
        },
        execute(params, ctx, state) {
            ctx.lineTo(params.x, params.y);
        }
    },
    "path_quadratic": {
        label: "Add quadratic curve through (${cpx}, ${cpy}) towards (${x}, ${y}) to path",
        short_label: "Add quadratic",
        category: "path_geometry",
        params: {
            cpx: {type: "number"}, cpy: {type: "number"},
            x: {type: "number"}, y: {type: "number"}
        },
        execute(params, ctx, state) {
            ctx.quadraticCurveTo(params.cpx, params.cpy, params.x, params.y);
        }
    },
    "path_cubic": {
        label: "Add cubic curve through (${cp1x}, ${cp1y}) and (${cp2x}, ${cp2y}) towards (${x}, ${y}) to path",
        short_label: "Add cubic",
        category: "path_geometry",
        params: {
            cp1x: {type: "number"}, cp1y: {type: "number"},
            cp2x: {type: "number"}, cp2y: {type: "number"},
            x: {type: "number"}, y: {type: "number"}
        },
        execute(params, ctx, state) {
            ctx.bezierCurveTo(params.cp1x, params.cp1y, params.cp2x, params.cp2y, params.x, params.y);
        }
    },
    "path_cw_arc": {
        label: "Add clockwise arc centered at (${x}, ${y}) with radius ${r} from ${startAngle} rad to ${endAngle} rad",
        short_label: "Add cw arc",
        category: "path_geometry",
        params: {
            x: {type: "number"}, y: {type: "number"},
            r: {type: "number"},
            startAngle: {type: "number"}, endAngle: {type: "number"}
        },
        execute(params, ctx, state) {
            ctx.arc(params.x, params.y, params.r, params.startAngle, params.endAngle);
        }
    },
    "path_ccw_arc": {
        label: "Add counterclockwise arc centered at (${x}, ${y}) with radius ${r} from ${startAngle} rad to ${endAngle} rad",
        short_label: "Add ccw arc",
        category: "path_geometry",
        params: {
            x: {type: "number"}, y: {type: "number"},
            r: {type: "number"},
            startAngle: {type: "number"}, endAngle: {type: "number"}
        },
        execute(params, ctx, state) {
            ctx.arc(params.x, params.y, params.r, params.startAngle, params.endAngle, true);
        }
    },
    "path_2p_arc": {
        label: "Add arc through (${x1}, ${y1}) to (${x2}, ${y2}) with radius ${r}",
        short_label: "Add arc towards point",
        category: "path_geometry",
        params: {
            x1: {type: "number"}, y1: {type: "number"},
            x2: {type: "number"}, y2: {type: "number"},
            r: {type: "number"}
        },
        execute(params, ctx, state) {
            ctx.arcTo(params.x1, params.y1, params.x2, params.y2, params.r);
        }
    },
    "path_cw_ell_arc": {
        label: "Add clockwise elliptical arc centered at (${x}, ${y}) with radii (${rx}, ${ry}) rotated by ${rot} rad from ${startAngle} rad to ${endAngle} rad",
        short_label: "Add cw elliptical arc",
        category: "path_geometry",
        params: {
            x: {type: "number"}, y: {type: "number"},
            rx: {type: "number"}, ry: {type: "number"},
            rot: {type: "number"},
            startAngle: {type: "number"}, endAngle: {type: "number"}
        },
        execute(params, ctx, state) {
            ctx.ellipse(params.x, params.y, params.rx, params.ry, params.rot, params.startAngle, params.endAngle);
        }
    },
    "path_ccw_ell_arc": {
        label: "Add counterclockwise elliptical arc centered at (${x}, ${y}) with radii (${rx}, ${ry}) rotated by ${rot} rad from ${startAngle} rad to ${endAngle} rad",
        short_label: "Add ccw elliptical arc",
        category: "path_geometry",
        params: {
            x: {type: "number"}, y: {type: "number"},
            rx: {type: "number"}, ry: {type: "number"},
            rot: {type: "number"},
            startAngle: {type: "number"}, endAngle: {type: "number"}
        },
        execute(params, ctx, state) {
            ctx.ellipse(params.x, params.y, params.rx, params.ry, params.rot, params.startAngle, params.endAngle, true);
        }
    },
    "path_rect": {
        label: "Add ${w}×${h} rectangle starting at (${x}, ${y})",
        short_label: "Add rectangle",
        category: "path_geometry",
        params: {
            w: {type: "number"}, h: {type: "number"},
            x: {type: "number"}, y: {type: "number"},
        },
        execute(params, ctx, state) {
            ctx.rect(params.x, params.y, params.w, params.h);
        }
    },
    "path_round_rect": {
        label: "Add ${w}×${h} rectangle starting at (${x}, ${y}) with rounded corners of radius ${r}",
        short_label: "Add round rect",
        category: "path_geometry",
        params: {
            w: {type: "number"}, h: {type: "number"},
            x: {type: "number"}, y: {type: "number"},
            r: {type: "number"}
        },
        execute(params, ctx, state) {
            ctx.roundRect(params.x, params.y, params.w, params.h, params.r);
        }
    },
    "path_round4_rect": {
        label: "Add ${w}×${h} rectangle starting at (${x}, ${y}) with rounded corners of radii ${r1}, ${r2}, ${r3}, ${r4}",
        short_label: "Add round rect w/ 4 radii",
        category: "path_geometry",
        params: {
            w: {type: "number"}, h: {type: "number"},
            x: {type: "number"}, y: {type: "number"},
            r1: {type: "number"}, r2: {type: "number"}, r3: {type: "number"}, r4: {type: "number"}
        },
        execute(params, ctx, state) {
            ctx.roundRect(params.x, params.y, params.w, params.h, [params.r1, params.r2, params.r3, params.r4]);
        }
    },
    "clear_rect": {
        label: "Clear ${w}×${h} rectangle from (${x}, ${y})",
        short_label: "Clear rectangle",
        category: "geometry",
        params: {
            x: {type: "number"}, y: {type: "number"},
            w: {type: "number"}, h: {type: "number"}
        },
        execute(params, ctx, state) {
            ctx.clearRect(params.x, params.y, params.w, params.h);
        }
    },
    "fill_rect": {
        label: "Fill ${w}×${h} rectangle from (${x}, ${y})",
        short_label: "Fill rectangle",
        category: "geometry",
        params: {
            x: {type: "number"}, y: {type: "number"},
            w: {type: "number"}, h: {type: "number"}
        },
        execute(params, ctx, state) {
            ctx.fillRect(params.x, params.y, params.w, params.h);
        }
    },
    "stroke_rect": {
        label: "Stroke ${w}×${h} rectangle from (${x}, ${y})",
        short_label: "Stroke rectangle",
        category: "geometry",
        params: {
            x: {type: "number"}, y: {type: "number"},
            w: {type: "number"}, h: {type: "number"}
        },
        execute(params, ctx, state) {
            ctx.strokeRect(params.x, params.y, params.w, params.h);
        }
    },
    "fill_text": {
        label: "Fill text “${text}” at (${x}, ${y})",
        short_label: "Fill text",
        category: "text",
        params: {
            text: {type: "text"},
            x: {type: "number"}, y: {type: "number"},
        },
        execute(params, ctx, state) {
            ctx.fillText(params.text, params.x, params.y);
        }
    },
    "stroke_text": {
        label: "Stroke text “${text}” at (${x}, ${y})",
        short_label: "Stroke text",
        category: "text",
        params: {
            text: {type: "text"},
            x: {type: "number"}, y: {type: "number"},
        },
        execute(params, ctx, state) {
            ctx.strokeText(params.text, params.x, params.y);
        }
    },
};

export function createBlock(type) {
  const def = blockRegistry[type];
  const params = {};
  for (const [name, meta] of Object.entries(def.params)) {
    params[name] = "";
  }
  return { type, params };
}

export default blockRegistry;